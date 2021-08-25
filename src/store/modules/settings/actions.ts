import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { SettingsState } from './state'
import { Mutations } from './mutations'
import { SettingsMutationTypes } from './mutation-types'
import { SettingsActionTypes } from './action-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<SettingsState, RootState>, 'commit'>

export interface Actions {
  [SettingsActionTypes.ACTION_CHANGE_SETTING](
    { commit }: AugmentedActionContext,
    payload: { key: string, value: any }
  ): void
}

export const actions: ActionTree<SettingsState, RootState> & Actions = {
  [SettingsActionTypes.ACTION_CHANGE_SETTING](
    { commit }: AugmentedActionContext,
    payload: { key: string, value: any }
  ) {
    commit(SettingsMutationTypes.CHANGE_SETTING, payload)
  }
}
