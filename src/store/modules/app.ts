import {
  getSidebarStatus,
  getActiveThemeName,
  setSidebarStatus,
  setActiveThemeName
} from '@/utils/cookies'
import themeList from '@/config/theme'

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  /** 主题列表 */
  themeList: { title: string, name: string }[]
  /** 正在应用的主题的名字 */
  activeThemeName: string
}

const state: IAppState = {
  device: DeviceType.Desktop,
  sidebar: {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  },
  themeList: themeList,
  activeThemeName: getActiveThemeName() || 'normal'
}

// 初始化
document.body.className = `theme-${state.activeThemeName}`

const mutations = {
  TOGGLE_SIDEBAR: (state: IAppState, withoutAnimation: boolean) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = withoutAnimation
    if (state.sidebar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  },
  CLOSE_SIDEBAR: (state: IAppState, withoutAnimation: boolean) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus('closed')
  },
  TOGGLE_DEVICE: (state: IAppState, device: DeviceType) => {
    state.device = device
  },
  SET_THEME: (state: IAppState, activeThemeName: string) => {
    // 检查这个主题在主题列表里是否存在
    state.activeThemeName = state.themeList.find(
      (theme) => theme.name === activeThemeName
    )
      ? activeThemeName
      : state.themeList[0].name
    // 应用到 dom
    document.body.className = `theme-${state.activeThemeName}`
    // 持久化
    setActiveThemeName(state.activeThemeName)
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
