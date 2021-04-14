import { AxiosAdapter } from 'axios'
interface UserRequestData {
  username: string
  password: string
}

export default (request: AxiosAdapter) => {
  return {
    // 登录以后返回 token
    accountLogin(data: UserRequestData) {
      return request({
        url: 'user/login',
        method: 'post',
        data
      })
    },
    // 获取用户详情
    userInfoRequest() {
      return request({
        url: 'user/userInfo',
        method: 'get'
      })
    }
  }
}
