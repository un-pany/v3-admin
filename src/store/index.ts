import { createStore } from 'vuex'
import app, { IAppState } from './modules/app'
import permission, { IPermissionState } from './modules/permission'
import settings, { ISettingsState } from './modules/settings'
import tagsView, { ITagsViewState } from './modules/tags-view'
import user, { IUserState } from './modules/user'

interface IRootState {
  app: IAppState
  permission: IPermissionState
  settings: ISettingsState
  user: IUserState
  tagsView: ITagsViewState
}

export const store = createStore<IRootState>({
  modules: {
    app,
    permission,
    settings,
    tagsView,
    user
  }
})
