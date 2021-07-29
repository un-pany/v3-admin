import { createStore } from 'vuex'
import { AppState, AppStore, store as app } from '@/store/modules/app'
import { SettingsState, SettingStore, store as settings } from '@/store/modules/settings'
import { PermissionState, PermissionStore, store as permission } from '@/store/modules/permission'
import { store as user, UserState, UserStore } from '@/store/modules/user'
import { store as tagViews, TagsStore, TagsViewState } from '@/store/modules/tagsview'

export interface RootState {
  app: AppState
  settings: SettingsState
  permission: PermissionState
  user: UserState
  tagViews: TagsViewState
}

export type Store = AppStore<Pick<RootState, 'app'>> & SettingStore<Pick<RootState, 'settings'>>
  & PermissionStore<Pick<RootState, 'permission'>> & UserStore<Pick<RootState, 'user'>>
  & TagsStore<Pick<RootState, 'tagViews'>>

export const store = createStore({
  modules: {
    app,
    settings,
    permission,
    user,
    tagViews
  }
})

export function useStore(): Store {
  return store as Store
}
