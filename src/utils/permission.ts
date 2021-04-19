/* 全局权限判断函数 和 指令 v-permission 功能类似 */

import { useStore } from '@/store'

export const checkPermission = (value: string[]): boolean => {
  if (value && value instanceof Array && value.length > 0) {
    const roles = useStore().state.user.roles
    const permissionRoles = value
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    console.error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    return false
  }
}
