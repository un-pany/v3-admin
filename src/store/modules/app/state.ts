import { getSidebarStatus, getActiveThemeName } from '@/utils/cookies'
import { getLocale } from '@/locales'
import themeList from '@/config/theme'

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface AppState {
  device: DeviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  language: string
  themeList: string[]
  activeThemeName: string
}

export const state: AppState = {
  device: DeviceType.Desktop,
  sidebar: {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  },
  language: getLocale(),
  themeList: themeList, // 主题列表
  activeThemeName: getActiveThemeName() || 'normal' // 正在应用的主题的名字
}

document.body.className = `theme-${state.activeThemeName}` // 初始化
