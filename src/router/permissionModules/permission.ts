import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const permissionRouter: Array<RouteRecordRaw> = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/directive',
    meta: {
      title: 'permission',
      icon: '#iconquanxian',
      roles: ['admin', 'editor'], // 你可以在根导航系统中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: 'page',
        component: () => import(/* webpackChunkName: "permission-page" */ '@/views/permission/Page.vue'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // 或者你只能在子导航中设置角色
        }
      },
      {
        path: 'directive',
        component: () => import(/* webpackChunkName: "permission-directive" */ '@/views/permission/Directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // 如果未设置角色，则表示：该页面不需要权限
        }
      },
      {
        path: 'role',
        component: () => import(/* webpackChunkName: "permission-role" */ '@/views/permission/role/Role.vue'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  }
]
export default permissionRouter
