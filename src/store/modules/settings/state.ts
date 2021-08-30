import layoutSettings from '@/config/layout'

export interface SettingsState {
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  showLangSelect: boolean
  showThemeSwitch: boolean
  showScreenfull: boolean

}

export const state: SettingsState = {
  fixedHeader: layoutSettings.fixedHeader,
  showSettings: layoutSettings.showSettings,
  showTagsView: layoutSettings.showTagsView,
  showSidebarLogo: layoutSettings.showSidebarLogo,
  showLangSelect: layoutSettings.showLangSelect,
  showThemeSwitch: layoutSettings.showThemeSwitch,
  showScreenfull: layoutSettings.showScreenfull
}
