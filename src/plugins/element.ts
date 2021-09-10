/* element 组件 */
import ElementPlus from 'element-plus'
import '@/styles/element-variables.scss'
export default function loadComponent(app: any) {
  app.use(ElementPlus)
}
