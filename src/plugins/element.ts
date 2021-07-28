/* element 组件 */
import i18n from '@/locales'
import ElementPlus from 'element-plus'
import '@/styles/element-variables.scss'
export default function loadComponent(app: any) {
  app.use(ElementPlus, { i18n: i18n.global.t })
}
