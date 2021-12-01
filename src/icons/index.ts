import { createApp } from 'vue'
import SvgIcon from '@/components/svg-icon/index.vue' // svg component

const requireAll = function(requireContext: any) {
  return requireContext.keys().map(requireContext)
}
const req = require['context']('./svg', false, /\.svg$/)

requireAll(req)

export default function(app: ReturnType<typeof createApp>) {
  app.component('SvgIcon', SvgIcon)
}
