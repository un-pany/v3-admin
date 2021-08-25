import { CommitOptions, DispatchOptions, Module, Store as VuexStore } from 'vuex'
import { RootState } from '@/store'
import type { TagsViewState } from './state'
import { state } from './state'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'

export { TagsViewState }

export type TagsStore<S = TagsViewState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>
  & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
      key: K,
      payload: P,
      options?: CommitOptions
    ): ReturnType<Mutations[K]>
  } & {
    dispatch<K extends keyof Actions>(
      key: K,
      payload: Parameters<Actions[K]>[1],
      options?: DispatchOptions
    ): ReturnType<Actions[K]>
  };
export const store: Module<TagsViewState, RootState> = {
  state,
  mutations,
  actions
}
