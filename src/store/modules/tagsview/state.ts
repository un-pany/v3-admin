import { RouteLocationNormalized, _RouteLocationBase } from 'vue-router'

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string
  to?: _RouteLocationBase
}

export interface TagsViewState {
  visitedViews: TagView[]
  cachedViews: (string | undefined)[]
}

export const state: TagsViewState = {
  visitedViews: [],
  cachedViews: []
}
