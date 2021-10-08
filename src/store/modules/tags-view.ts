import { _RouteLocationBase, RouteLocationNormalized } from 'vue-router'

export interface ITagView extends Partial<RouteLocationNormalized> {
  title?: string
  to?: _RouteLocationBase
}

export interface ITagsViewState {
  visitedViews: ITagView[]
}

const state: ITagsViewState = {
  visitedViews: []
}

const mutations = {
  ADD_VISITED_VIEW: (state: ITagsViewState, view: ITagView) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta?.title || 'no-name'
      })
    )
  },
  DEL_VISITED_VIEW: (state: ITagsViewState, view: ITagView) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_OTHERS_VISITED_VIEWS: (state: ITagsViewState, view: ITagView) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta?.affix || v.path === view.path
    })
  },
  DEL_ALL_VISITED_VIEWS: (state: ITagsViewState) => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta?.affix)
    state.visitedViews = affixTags
  },
  UPDATE_VISITED_VIEW: (state: ITagsViewState, view: ITagView) => {
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
