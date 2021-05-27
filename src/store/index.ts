import { createStore, createLogger } from 'vuex'
import { store as app, AppStore, AppState } from '@/store/modules/app'
import { store as settings, SettingStore, SettingsState } from '@/store/modules/settings'
import { store as permission, PermissionStore, PermissionState } from '@/store/modules/permission'
import { store as user, UserStore, UserState } from '@/store/modules/user'
import { store as tagViews, TagsStore, TagsViewState } from '@/store/modules/tagsview'
import loggerSettings from '@/config/logger'

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

// 在开发环境中插入记录器 logger
let debug
let plugins
if (loggerSettings.openLogger) {
  debug = process.env.NODE_ENV !== 'production'
  plugins = debug ? [createLogger({})] : []
}

export const store = createStore({
  plugins,
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
