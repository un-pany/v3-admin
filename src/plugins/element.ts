import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

/** element-plus 组件 */
export default function loadComponent(app: any) {
  app.use(ElementPlus)
}
