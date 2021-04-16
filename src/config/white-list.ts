/* 免登录白名单 */
const whiteList = ['/login']

/* 重置路由白名单（切换权限、退出登录等情况下会重置路由） */
/* 重置路由时，只可能重置带有 name 属性的路由，具体请查看 @/router/index.ts */
const resetRouterWhiteList = ['/dashboard', '/login']

export {
  whiteList,
  resetRouterWhiteList
}