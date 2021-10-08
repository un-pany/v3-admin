import layoutSettings from '@/config/layout'

export interface ISettingsState {
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  showThemeSwitch: boolean
  showScreenfull: boolean
}

const state: ISettingsState = {
  fixedHeader: layoutSettings.fixedHeader,
  showSettings: layoutSettings.showSettings,
  showTagsView: layoutSettings.showTagsView,
  showSidebarLogo: layoutSettings.showSidebarLogo,
  showThemeSwitch: layoutSettings.showThemeSwitch,
  showScreenfull: layoutSettings.showScreenfull
}

const mutations = {
  CHANGE_SETTING: (state: ISettingsState, payload: { key: string, value: any }) => {
    const { key, value } = payload
    switch (key) {
      case 'fixedHeader':
        state.fixedHeader = value
        break
      case 'showSettings':
        state.showSettings = value
        break
      case 'showSidebarLogo':
        state.showSidebarLogo = value
        break
      case 'showTagsView':
        state.showTagsView = value
        break
      case 'showThemeSwitch':
        state.showThemeSwitch = value
        break
      case 'showScreenfull':
        state.showScreenfull = value
        break
      default:
        break
    }
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
