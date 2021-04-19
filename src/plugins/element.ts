/* element 组件 */

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
export default function loadComponent(app: any) {
  app.use(ElementPlus)
}
