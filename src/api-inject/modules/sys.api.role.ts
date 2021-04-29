import { AxiosAdapter } from 'axios'

export default (request: AxiosAdapter) => {
  return {
    getRoutes() {
      return request({
        url: 'roles/getRoutes',
        method: 'get'
      })
    },
    getRoles() {
      return request({
        url: 'roles/getRoles',
        method: 'get'
      })
    },
    delRole(id: number) {
      return request({
        url: `roles/deleteRole?id=${id}`,
        method: 'delete'
      })
    },
    updateRole(id: number, data: any) {
      return request({
        url: `roles/updateRole/${id}`,
        method: 'post',
        data
      })
    },
    createRole(role: any) {
      return request({
        url: 'roles/createRole',
        method: 'put',
        data: role
      })
    }
  }
}
