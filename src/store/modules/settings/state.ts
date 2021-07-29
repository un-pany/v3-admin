import layoutSettings from '@/config/layout'
import themeList from '@/config/theme'
import { getActiveThemeName } from '@/utils/cookies'

export interface SettingsState {
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  langSelect: boolean
  themeList: string[]
  activeThemeName: string
}

export const state: SettingsState = {
  fixedHeader: layoutSettings.fixedHeader,
  showSettings: layoutSettings.showSettings,
  showTagsView: layoutSettings.showTagsView,
  showSidebarLogo: layoutSettings.showSidebarLogo,
  langSelect: layoutSettings.langSelect,
  themeList: themeList, // 主题列表
  activeThemeName: getActiveThemeName() || 'normal' // 正在应用的主题的名字
}

document.body.className = `theme-${state.activeThemeName}` // 初始化
