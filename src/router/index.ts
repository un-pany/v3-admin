import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'
import { resetRouterWhiteList } from '@/config/white-list'

// 导入常驻路由
const constantFiles = require.context('./constantModules', true, /\.ts$/)
let constantModules: Array<RouteRecordRaw> = []
constantFiles.keys().forEach((key) => {
  if (key === './index.ts') return
  constantModules = constantModules.concat(constantFiles(key).default)
})

// 导入动态路由
const asyncFiles = require.context('./permissionModules', true, /\.ts$/)
let permissionModules: Array<RouteRecordRaw> = []
asyncFiles.keys().forEach((key) => {
  if (key === './index.ts') return
  permissionModules = permissionModules.concat(asyncFiles(key).default)
})

// 路由表
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/Index.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  ...constantModules
]

export const asyncRoutes: Array<RouteRecordRaw> = [
  ...permissionModules
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export function resetRouter() {
  // 重置路由
  // 重置路由时，只可能重置带有 name 属性的路由，所以动态路由请务必加上 name 属性
  try {
    router.getRoutes().forEach((route) => {
      const { name, path } = route
      if (name && !resetRouterWhiteList.includes(path)) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器，不过体验不是很好
    window.location.reload()
  }
}

export default router
