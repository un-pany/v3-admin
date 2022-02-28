import { getToken, removeToken, setToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { accountLogin, userInfoRequest } from '@/api/login'
import { RouteRecordRaw } from 'vue-router'

export interface IUserState {
  token: string
  name: string
  avatar: string
  roles: string[]
}

const state: IUserState = {
  token: getToken() || '',
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state: IUserState, token: string) => {
    state.token = token
  },
  SET_NAME: (state: IUserState, name: string) => {
    state.name = name
  },
  SET_AVATAR: (state: IUserState, avatar: string) => {
    state.avatar = avatar
  },
  SET_ROLES: (state: IUserState, roles: string[]) => {
    state.roles = roles
  }
}

const actions = {
  /** 登录 */
  login({ commit }: any, userInfo: { username: string, password: string }) {
    let { username, password } = userInfo
    username = username.trim()
    return new Promise((resolve, reject) => {
      accountLogin({ username, password })
        .then((res: any) => {
          setToken(res.data.accessToken)
          commit('SET_TOKEN', res.data.accessToken)
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  /** 获取用户详情 */
  getInfo({ commit }: any) {
    return new Promise((resolve, reject) => {
      userInfoRequest()
        .then((res: any) => {
          commit('SET_NAME', res.data.user.name)
          commit('SET_AVATAR', res.data.user.avatar)
          commit('SET_ROLES', res.data.user.roles)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  /** 切换角色 */
  async changeRoles({ commit, state, dispatch, rootState }: any, role: string) {
    const token = role + '-token'
    commit('SET_TOKEN', token)
    setToken(token)
    await dispatch('getInfo')
    dispatch('permission/setRoutes', state.roles, { root: true })
    resetRouter()
    rootState.permission.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
  },
  /** 登出 */
  logout({ commit }: any) {
    removeToken()
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    resetRouter()
  },
  /** 重置 token */
  resetToken({ commit }: any) {
    removeToken()
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
