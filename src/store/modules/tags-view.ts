import { _RouteLocationBase, RouteLocationNormalized } from 'vue-router'

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string
  to?: _RouteLocationBase
}

export interface TagsViewState {
  visitedViews: TagView[]
}

const state: TagsViewState = {
  visitedViews: []
}

const mutations = {
  ADD_VISITED_VIEW: (state: TagsViewState, view: TagView) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta?.title || 'no-name'
      })
    )
  },
  DEL_VISITED_VIEW: (state: TagsViewState, view: TagView) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_OTHERS_VISITED_VIEWS: (state: TagsViewState, view: TagView) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta?.affix || v.path === view.path
    })
  },
  DEL_ALL_VISITED_VIEWS: (state: TagsViewState) => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta?.affix)
    state.visitedViews = affixTags
  },
  UPDATE_VISITED_VIEW: (state: TagsViewState, view: TagView) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
