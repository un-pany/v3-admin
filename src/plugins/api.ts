/* api */
import api from '@/api-inject'
export default function loadComponent(app: any) {
  app.provide('$api', api)
}
