import { MutationTree } from 'vuex'
import { SettingsState } from './state'
import { SettingsMutationTypes } from './mutation-types'
import { setActiveThemeName } from '@/utils/cookies'

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
      case 'showLangSelect':
        state.showLangSelect = value
        break
      case 'showThemeSwitch':
        state.showThemeSwitch = value
        break
      case 'showScreenfull':
        state.showScreenfull = value
        break
      case 'activeThemeName':
        // 检查这个主题在主题列表里是否存在
        state.activeThemeName = state.themeList.find(themeName => themeName === value) ? value : state.themeList[0]
        // 应用到 dom
        document.body.className = `theme-${state.activeThemeName}`
        // 持久化
        setActiveThemeName(state.activeThemeName)
        break
      default:
        break
    }
  }
}
