/* api */
import api from '@/apis'
export default function loadComponent(app: any) {
  app.provide('$api', api)
}
