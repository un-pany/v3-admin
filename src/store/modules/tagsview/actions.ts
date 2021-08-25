import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { TagsViewState, TagView } from './state'
import { Mutations } from './mutations'
import { TagsMutationTypes } from './mutation-types'
import { TagsActionTypes } from './action-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<TagsViewState, RootState>, 'commit'>

type NoAugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<TagsViewState, RootState>, 'commit'>

export interface Actions {
  [TagsActionTypes.ACTION_ADD_VIEW](
    { commit }: AugmentedActionContext,
    view: TagView
  ): void
  [TagsActionTypes.ACTION_ADD_VISITED_VIEW](
    { commit }: AugmentedActionContext,
    view: TagView
  ): void
  [TagsActionTypes.ACTION_DEL_VIEW](
    { commit }: AugmentedActionContext,
    view: TagView
  ): void
  [TagsActionTypes.ACTION_DEL_OTHER_VIEW](
    { commit }: AugmentedActionContext,
    view: TagView
  ): void
  [TagsActionTypes.ACTION_OTHER_VIEWS](
    { commit }: AugmentedActionContext,
    view: TagView
  ): void
  [TagsActionTypes.ACTION_DEL_ALL_VIEWS](
    { commit }: NoAugmentedActionContext
  ): void
  [TagsActionTypes.ACTION_UPDATE_VISITED_VIEW](
    { commit }: AugmentedActionContext,
    view: TagView
  ): void
}

export const actions: ActionTree<TagsViewState, RootState> & Actions = {
  async [TagsActionTypes.ACTION_ADD_VIEW]({ commit }, view: TagView) {
    commit(TagsMutationTypes.ADD_VISITED_VIEW, view)
  },
  [TagsActionTypes.ACTION_ADD_VISITED_VIEW]({ commit }, view: TagView) {
    commit(TagsMutationTypes.ADD_VISITED_VIEW, view)
  },
  [TagsActionTypes.ACTION_DEL_VIEW]({ commit }, view: TagView) {
    commit(TagsMutationTypes.DEL_VISITED_VIEW, view)
  },
  [TagsActionTypes.ACTION_DEL_OTHER_VIEW]({ commit }, view: TagView) {
    commit(TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS, view)
  },
  [TagsActionTypes.ACTION_OTHER_VIEWS]({ commit }, view: TagView) {
    commit(TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS, view)
  },
  [TagsActionTypes.ACTION_DEL_ALL_VIEWS]({ commit }) {
    commit(TagsMutationTypes.DEL_ALL_VISITED_VIEWS)
  },
  [TagsActionTypes.ACTION_UPDATE_VISITED_VIEW]({ commit }, view: TagView) {
    commit(TagsMutationTypes.UPDATE_VISITED_VIEW, view)
  }

}
