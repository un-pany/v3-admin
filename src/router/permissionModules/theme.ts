// 换肤

import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const ThemeRouter: Array<RouteRecordRaw> = [
  {
    path: '/theme',
    component: Layout,
    name: 'Theme',
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "theme" */ '@/views/theme/Index.vue'),
        name: 'ThemeIndex',
        meta: {
          title: 'theme',
          icon: 'theme'
        }
      }
    ]
  }
]

export default ThemeRouter
