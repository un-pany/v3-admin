import { RouteRecordRaw } from 'vue-router'

export interface PermissionState {
  routes: RouteRecordRaw[]
  dynamicRoutes: RouteRecordRaw[]
}

export const state: PermissionState = {
  routes: [],
  dynamicRoutes: []
}
