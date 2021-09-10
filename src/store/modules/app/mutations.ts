import { MutationTree } from 'vuex'
import { AppState, DeviceType } from './state'
import { AppMutationTypes } from './mutation-types'
import { setSidebarStatus, setActiveThemeName } from '@/utils/cookies'

export type Mutations<S = AppState> = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state: S, withoutAnimation: boolean): void
  [AppMutationTypes.CLOSE_SIDEBAR](state: S, withoutAnimation: boolean): void
  [AppMutationTypes.TOGGLE_DEVICE](state: S, device: DeviceType): void
  [AppMutationTypes.SET_THEME](state: S, activeThemeName: string): void
}

export const mutations: MutationTree<AppState> & Mutations = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state: AppState, withoutAnimation: boolean) {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = withoutAnimation
    if (state.sidebar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  },

  [AppMutationTypes.CLOSE_SIDEBAR](state: AppState, withoutAnimation: boolean) {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus('closed')
  },

  [AppMutationTypes.TOGGLE_DEVICE](state: AppState, device: DeviceType) {
    state.device = device
  },

  [AppMutationTypes.SET_THEME](state: AppState, activeThemeName: string) {
    // 检查这个主题在主题列表里是否存在
    state.activeThemeName = state.themeList.find(themeName => themeName === activeThemeName) ? activeThemeName : state.themeList[0]
    // 应用到 dom
    document.body.className = `theme-${state.activeThemeName}`
    // 持久化
    setActiveThemeName(state.activeThemeName)
  }
}
