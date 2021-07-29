// setting moudle

import { CommitOptions, DispatchOptions, Module, Store as VuexStore } from 'vuex'

// TODO: How to surpass cyclical dependency linting errors cleanly?
// TODO：如何清晰地克服周期性依赖项错误？
import { RootState } from '@/store'
import type { UserState } from './state'
import { state } from './state'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'

export { UserState }

export type UserStore<S = UserState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>
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
export const store: Module<UserState, RootState> = {
  state,
  mutations,
  actions
  // TODO: With namespaced option turned on, having problem how to use dispatch with action types...
  // But without it, a bigger store might have clashes in namings
  // TODO：启用命名空间选项后，如何在操作类型中使用分派有问题...
  // 但是如果没有它，更大的 store 可能会在名称上产生冲突
  // namespaced: true,
}
