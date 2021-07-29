import { MutationTree } from 'vuex'
import { SettingsState } from './state'
import { SettingsMutationTypes } from './mutation-types'
import { setActiveTheme } from '@/utils/cookies'

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
      case 'activeThemeName':
        state.activeThemeName = state.themeList.find(e => e.name === value) ? value : state.themeList[0].name
        document.body.className = `theme-${state.activeThemeName}`
        setActiveTheme(state.activeThemeName)
        break
      default:
        break
    }
  }
}
