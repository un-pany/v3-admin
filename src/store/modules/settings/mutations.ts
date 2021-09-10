import { MutationTree } from 'vuex'
import { SettingsState } from './state'
import { SettingsMutationTypes } from './mutation-types'

export type Mutations<S = SettingsState> = {
  [SettingsMutationTypes.CHANGE_SETTING](state: S, payload: { key: string, value: any }): void
}

export const mutations: MutationTree<SettingsState> & Mutations = {
  [SettingsMutationTypes.CHANGE_SETTING](state: SettingsState, payload: { key: string, value: any }) {
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
