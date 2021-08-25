import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/constant/router'

const ExampleRouter: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    component: Layout,
    name: 'Error',
    redirect: '/404',
    meta: {
      hidden: true
    },
    children: [
      {
        path: '401',
        component: () => import(/* webpackChunkName: "error-page-401" */ '@/views/error-page/401.vue'),
        name: '401',
        meta: {
          title: '401',
          hidden: true
        }
      },
      {
        path: '404',
        component: () => import(/* webpackChunkName: "error-page-404" */ '@/views/error-page/404.vue'),
        name: '404',
        meta: {
          title: '404',
          hidden: true
        }
      }
    ]
  }
]

export default ExampleRouter
