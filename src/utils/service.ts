import axios, { AxiosRequestConfig } from 'axios'
import { get } from 'lodash'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/cookies'

// 存储每个请求的标识和对应的取消函数
const pendingAjax = new Map()
// 请求标志
const duplicatedKeyFn = (config: AxiosRequestConfig) => `${config.method}${config.url}${JSON.stringify(config.params)}${JSON.stringify(config.data)}`
// 将请求添加到pendingAjax
function addPendingAjax(config: AxiosRequestConfig) {
  const duplicatedKey = JSON.stringify({
    duplicatedKey: duplicatedKeyFn(config),
    type: 'DUPLICATED_REQUEST'
  })
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    // 如果pendingAjax中不存在当前请求，添加进去
    if (duplicatedKey && !pendingAjax.has(duplicatedKey)) {
      pendingAjax.set(duplicatedKey, cancel)
    }
  })
}
// 从pendingAjax中删除请求
function removePendingAjax(config: AxiosRequestConfig) {
  const duplicatedKey = JSON.stringify({
    duplicatedKey: duplicatedKeyFn(config),
    type: 'DUPLICATED_REQUEST'
  })
  // 如果pendingAjax中存在当前请求, 取消当前请求并将其删除
  if (duplicatedKey && pendingAjax.has(duplicatedKey)) {
    const cancel = pendingAjax.get(duplicatedKey)
    cancel(duplicatedKey)
    pendingAjax.delete(duplicatedKey)
  }
}

// 创建请求实例
function createService() {
  // 创建一个 axios 实例
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    config => {
      removePendingAjax(config) // have bug，时序问题
      addPendingAjax(config)
      return config
    },
    error => {
      // 发送失败
      return Promise.reject(error)
    }
  )
  // 响应拦截
  service.interceptors.response.use(
    response => {
      removePendingAjax(response.config)
      // dataAxios 是 axios 返回数据中的 data
      const dataAxios = response.data
      // 这个状态码是和后端约定的
      const { code } = dataAxios
      // 根据 code 进行判断
      if (code === undefined) {
        // 如果没有 code 代表这不是项目后端开发的接口
        return dataAxios
      } else {
        // 有 code 代表这是一个后端接口 可以进行进一步的判断
        switch (code) {
          case 0:
            // [ 示例 ] code === 0 代表没有错误
            return dataAxios
          default:
            // 不是正确的 code
            break
        }
      }
    },
    error => {
      const config = error.config || {}
      removePendingAjax(config)
      // 类型是否为重复请求
      // 取消请求会报错，但不应该返回给用户
      let isDuplicatedType
      try {
        const errorType = (JSON.parse(error.message) || {}).type
        isDuplicatedType = errorType === 'DUPLICATED_REQUEST'
      } catch (error) {
        isDuplicatedType = false
      }
      if (isDuplicatedType) return

      const status = get(error, 'response.status')
      switch (status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )
  return service
}

// 用于网络请求的实例和请求方法
export const service = createService()

// 创建请求方法
function createRequestFunction() {
  return function(config: AxiosRequestConfig) {
    const configDefault = {
      headers: {
        // Authorization: 'Bearer ' + getToken(),
        token: getToken(), // mock 接口专用，开发时可删除
        'Content-Type': get(config, 'headers.Content-Type', 'application/json')
      },
      timeout: 5000,
      baseURL: process.env.VUE_APP_BASE_API,
      data: {}
    }
    return service(Object.assign(configDefault, config))
  }
}

// 用于网络请求的实例和请求方法
export const request = createRequestFunction()
