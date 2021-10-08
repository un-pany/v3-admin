import { createStore } from 'vuex'
import app, { AppState } from './modules/app'
import permission, { PermissionState } from './modules/permission'
import settings, { SettingsState } from './modules/settings'
import tagsView, { TagsViewState } from './modules/tags-view'
import user, { UserState } from './modules/user'

export interface RootState {
  app: AppState
  permission: PermissionState
  settings: SettingsState
  user: UserState
  tagsView: TagsViewState
}

export const store = createStore<RootState>({
  modules: {
    app,
    permission,
    settings,
    tagsView,
    user
  }
})
