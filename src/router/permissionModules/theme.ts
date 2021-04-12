// 换肤

import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const ThemeRouter: Array<RouteRecordRaw> = [
  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "theme" */ '@/views/theme/Index.vue'),
        name: 'Theme',
        meta: {
          title: 'theme',
          icon: '#iconhuanfu'
        }
      }
    ]
  }
]

export default ThemeRouter
