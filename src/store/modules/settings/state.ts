import elementVariables from '@/styles/element-variables.scss'
import layoutSettings from '@/config/layout'
export interface SettingsState {
  theme: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
  langSelect: boolean
}

export const state: SettingsState = {
  theme: elementVariables.theme,
  fixedHeader: layoutSettings.fixedHeader,
  showSettings: layoutSettings.showSettings,
  showTagsView: layoutSettings.showTagsView,
  showSidebarLogo: layoutSettings.showSidebarLogo,
  sidebarTextTheme: layoutSettings.sidebarTextTheme,
  langSelect: layoutSettings.langSelect
}
