/* 根据大小变化重新布局 */

import { store } from '@/store'
import { DeviceType } from '@/store/modules/app'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const WIDTH = 992 // 参考 Bootstrap 的响应式设计

export default function() {
  const device = computed(() => {
    return store.state.app.device
  })

  const sidebar = computed(() => {
    return store.state.app.sidebar
  })

  const currentRoute = useRoute()

  const watchRouter = watch(() => currentRoute.name, () => {
    if (store.state.app.device === DeviceType.Mobile && store.state.app.sidebar.opened) {
      store.commit('app/CLOSE_SIDEBAR', false)
    }
  })

  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const resizeMounted = () => {
    if (isMobile()) {
      store.commit('app/TOGGLE_DEVICE', DeviceType.Mobile)
      store.commit('app/CLOSE_SIDEBAR', true)
    }
  }

  const resizeHandler = () => {
    if (!document.hidden) {
      store.commit('app/TOGGLE_DEVICE', isMobile() ? DeviceType.Mobile : DeviceType.Desktop)
      if (isMobile()) {
        store.commit('app/CLOSE_SIDEBAR', true)
      }
    }
  }

  const addEventListenerOnResize = () => {
    window.addEventListener('resize', resizeHandler)
  }

  const removeEventListenerResize = () => {
    window.removeEventListener('resize', resizeHandler)
  }

  return {
    device,
    sidebar,
    resizeMounted,
    addEventListenerOnResize,
    removeEventListenerResize,
    watchRouter
  }
}
