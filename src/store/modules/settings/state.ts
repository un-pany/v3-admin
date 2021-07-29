import layoutSettings from '@/config/layout'
import themeList from '@/config/theme'
import { getActiveTheme } from '@/utils/cookies'

export interface SettingsState {
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  langSelect: boolean
  themeList: {title: string, name: string}[]
  activeThemeName: string
}

export const state: SettingsState = {
  fixedHeader: layoutSettings.fixedHeader,
  showSettings: layoutSettings.showSettings,
  showTagsView: layoutSettings.showTagsView,
  showSidebarLogo: layoutSettings.showSidebarLogo,
  langSelect: layoutSettings.langSelect,
  themeList: themeList,
  activeThemeName: getActiveTheme() || 'normal'
}

document.body.className = `theme-${state.activeThemeName}`
