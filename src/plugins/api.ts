/*
 * @Description: api
 * @Author: ZY
 * @Date: 2020-12-19 11:53:48
 * @LastEditors: ZY
 * @LastEditTime: 2020-12-23 10:08:34
 */
import api from '@/apis'
export default function loadComponent(app: any) {
  app.provide('$api', api)
}
