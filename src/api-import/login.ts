/**
* api-import
* 实现：采用 import/export 的方式
* 优点：拥有 TypeScript 类型提示
* 缺点：使用时需要 "import { accountLogin } from '@/api-import/login'" 来导入指导的api
* @see：暂无
*/

import { request } from '@/utils/service'

interface UserRequestData {
  username: string
  password: string
}

// 登录以后返回 token
export function accountLogin(data: UserRequestData) {
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}
// 获取用户详情
export function userInfoRequest() {
  return request({
    url: 'user/userInfo',
    method: 'get'
  })
}
