import { AxiosAdapter } from 'axios'
interface UserRequestData {
  username: string
  password: string
}

export default (request: AxiosAdapter) => {
  return {
    // 登录以后返回token
    accountLogin(data: UserRequestData) {
      return request({
        url: '/ums/admin/login',
        method: 'post',
        data
      })
    }
  }
}
