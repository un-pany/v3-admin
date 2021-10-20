> Upgrading the plugin vetur to **volar** will better support vue3.2

# ⚡️ Introduction

A basic solution for middle and background management system, based on vue3, typescript, element plus and Vue cli 4.5

## Documentation

[简体中文](https://juejin.cn/post/6963876125428678693) | English

## preview

| position | account | link |
| --- | --- | --- |
| github-pages | admin or editor | [link](https://un-pany.github.io/v3-admin) |

## Features

```text
- User management
  - login
  - logout
	
- Permission Authentication
  - page permissions
  - directive permissions

- Multi-environment build
  - development
  - test
  - production
  
- Global Features
  - svg
  - Multiple themes switching（Contains dark themes）
  - Dynamic sidebar (supports multi-level routing)
  - Dynamic breadcrumb
  - Tags-view (Tab page Support right-click operation)
  - Screenfull
  - Responsive Sidebar

- Error Page
  - 401
  - 404

- Dashboard
  - admin
  - editor

- Auto deployment
```

## directory

```
# v3-admin
├─ .env.development   # development environment
├─ .env.production    # production environment
├─ .env.test          # test environment
├─ .eslintrc.js       # eslint
├─ deploy             # auto deployment
├─ public
│  ├─ favicon.ico
│  ├─ index.html
├─ src
│  ├─ @types          # ts declaration
│  ├─ api             # api interface
│  ├─ assets          # static resources
│  ├─ components      # global components
│  ├─ config          # global config
│  ├─ constant        # constant/
enumeration
│  ├─ directives      # global directives
│  ├─ icons           # svg icon
│  ├─ layout          # layout
│  ├─ locales         # internationalization
│  ├─ model           # global model
│  ├─ plugins         # plugins
│  ├─ router          # router
│  ├─ store           # vuex store
│  ├─ styles          # global styles
│  ├─ utils           # utils
│  └─ views           # pages
│  ├─ App.vue         # entry page
│  ├─ main.ts         # entry file
│  ├─ permission.ts   # manage permission
│  └─ shims.d.ts      # module injection
├─ tsconfig.json      # ts Compile config
└─ vue.config.js      # vue-cli config
```

## Getting started

```bash
# clone the project
git clone https://github.com/v3-projects/v3-admin

# enter the project directory
cd v3-admin

# install dependency
yarn

# develop
yarn dev
```

## Multi-environment build

```bash
# build test environment
yarn build:test

# build production environment
yarn build:prod
```

## Code format check

```bash
yarn lint
```

## Auto deployment

```bash
yarn deploy
```

# 📚 Essentials

## Router

### Config items

```
// if set to true, lt will not appear in sidebar nav
hidden: true

// this route cannot be clicked in breadcrumb navigation when noRedirect is set
redirect: 'noRedirect'

// Be sure to fill in the name of the set route, otherwise there may be problems in resetting the route
name: 'router-name'

meta: {
  // required roles to navigate to this route, Support multiple permissions stacking
  roles: ['admin', 'editor']
  // Set the name of the route displayed in the sidebar and breadcrumbs
  title: 'title'
  // Icon to set this route, Remember to import svg into @/assets/svg-icons/icons
  icon: 'svg-name'
  // The default is true. If it is set to false, it will not be displayed in breadcrumbs
  breadcrumb: false
  // The default is false. If set to true, it will be fixed in tags-view
  affix: true
  
  // When the children under a route declare more than one route, it will automatically become a nested mode
  // When there is only one, the sub route will be displayed in the sidebar as the root route
  // If you want to display your root route regardless of the number of children declarations below
  // You can set alwayShow: true, which will ignore the previously defined rules and always display the root route
  alwaysShow: true

  // When this property is set, the sidebar corresponding to the activemenu property will be highlighted when entering the route
  activeMenu: '/dashboard'
}
```

### Dynamic routes

`constantRoutes` places routes that do not require judgment permission in the resident route

`asyncRoutes` places routes that require dynamic permission judgment and are dynamically added through addroute places routes that require dynamic permission judgment and are dynamically added through `addRoute`

Add dynamic routing method:

Example, create a file such as `permission.ts` under `@/router/asyncModules`

```ts
import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/constant/router'

const permissionRouter: Array<RouteRecordRaw> = [
  {
    path: '/permission',
    component: Layout, 
    name: 'Permission',
    redirect: '/permission/directive',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'], // You can set the role in the root route
      alwaysShow: true // Always show the root menu
    },
    children: [
      {
        path: 'page',
        component: () => import(/* webpackChunkName: "permission-page" */ '@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // You can also set the role in the sub-route
        }
      },
      {
        path: 'directive',
        component: () => import(/* webpackChunkName: "permission-directive" */ '@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission' // If the role is not set, it means: This page does not require permissions, but will inherit role of roots
        }
      }
    ]
  }
]

export default permissionRouter
```

## Sidebar and breadcrumb

### Sidebar

![](assets/yFV2O.png)

Sidebar `@/layout/components/sidebar` is dynamically generated by reading routing and combining permission judgment (in other words, the constant route + has permission)

### Sidebar external links

You can set an outer chain in the sidebar, as long as you fill in the useful URL path in Path, you will help you open this page when you click on the sidebar.

```typescript
{
  path: 'link',
  component: Layout,
  children: [
    {
      path: 'https://github.com/v3-projects/v3-admin',
      meta: { title: 'link', icon: 'link' },
      name: 'Link'
    }
  ]
}
```

### Breadcrumb

![](assets/yFdaR.png)

Breadcrumb ` @/components/bread-crumb`is also generated dynamically according to the route. The route setting `breadcrumb: false` will not appear in the breadcrumb. The route setting `redirect: 'noredirect'`cannot be clicked in the breadcrumb

## Permission

When logging in, compare the routing table by obtaining the permissions (roles) of the current user, generate an accessible routing table according to the permissions of the current user, and then dynamically mount it to the router through `addRoute`.

### Role permission control

The control codes are all in `@/permission.ts`, which can be modified according to specific business:

```typescript
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'
import { useStore } from './store'
import { UserActionTypes } from './store/modules/user/action-types'
import { PermissionActionType } from './store/modules/permission/action-types'
import { UserMutationTypes } from './store/modules/user/mutation-types'
import { ElMessage } from 'element-plus'
import { whiteList } from './config/white-list'
import rolesSettings from './config/roles'
import { getToken } from '@/utils/cookies'

NProgress.configure({ showSpinner: false })

router.beforeEach(async(to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  NProgress.start()
  const store = useStore()
  // Determine if the user is logged in
  if (getToken()) {
    if (to.path === '/login') {
      // Redirect to the homepage if you log in and ready to enter the Login page.
      next({ path: '/' })
      NProgress.done()
    } else {
      // Check if the user has obtained its permissions role
      if (store.state.user.roles.length === 0) {
        try {
          if (rolesSettings.openRoles) {
            // Note: The role must be an array! E.g: ['admin'] 或 ['developer', 'editor']
            await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO, undefined)
            // Fetch the Roles returned by the interface
            const roles = store.state.user.roles
            // Generate accessible Routes based on roles
            store.dispatch(PermissionActionType.ACTION_SET_ROUTES, roles)
          } else {
            // Enable the default role without turning on the role function
            store.commit(UserMutationTypes.SET_ROLES, rolesSettings.defaultRoles)
            store.dispatch(PermissionActionType.ACTION_SET_ROUTES, rolesSettings.defaultRoles)
          }
          // Dynamically add accessible Routes
          store.state.permission.dynamicRoutes.forEach((route) => {
            router.addRoute(route)
          })
          // Ensure that the added route has been completed
          // Set replace: true, so navigation will not leave a history
          next({ ...to, replace: true })
        } catch (err) {
          // Delete token and redirect to the login page
          store.dispatch(UserActionTypes.ACTION_RESET_TOKEN, undefined)
          ElMessage.error(err || 'Has Error')
          next('/login')
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    // If there is no TOKEN
    if (whiteList.indexOf(to.path) !== -1) {
      // If you are in a whitelist that you don't need to log in, you will enter directly.
      next()
    } else {
      // Other pages without access rights will be redirected to the login page
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})


```

### Cancel the role feature

If you don't need the function of role, you can turn it off in `@/config/roles`. After turning it off, the system will enable the default role (usually the admin role with the highest permission), that is, each logged in user can see all routes

```typescript
interface RolesSettings {
  // Whether to enable the role function (After opening, the server needs to cooperate and return the role of the current user in the query user details interface)
  openRoles: boolean
  // After closing the role, the default role of the currently logged in user will take effect (admin by default, with all permissions)
  defaultRoles: Array<string>
}

const rolesSettings: RolesSettings = {
  openRoles: true,
  defaultRoles: ['admin']
}

export default rolesSettings

```

### Directive permissions

Concisely implement button level permission judgment (registered to the global and can be used directly):

```html
<el-tag v-permission="['admin']">admin is visible</el-tag>
<el-tag v-permission="['editor']">editor is visible</el-tag>
<el-tag v-permission="['admin','editor']">admin and editor are visible</el-tag>
```

However, in some cases, `v-permission` is not suitable. For example: ` el-tab ` or `el-table-column`  of ` Element-UI`and other scenes that dynamically render `DOM`. You can only do this by manually setting `v-if`.

At this time, you can use **permission judgment function**.

```typescript
import { checkPermission } from '@/utils/permission'
```

```html
<el-tab-pane v-if="checkPermission(['admin'])" label="Admin">admin is visible</el-tab-pane>
<el-tab-pane v-if="checkPermission(['editor'])" label="Editor">editor id visible</el-tab-pane>
<el-tab-pane v-if="checkPermission(['admin','editor'])" label="AdminEditor">admin and editor are visible</el-tab-pane>
```

## Send HTTP request

The general process is as follows：

![](assets/yFlGd.png)

###  Common management API

`@/api/login.ts`

```typescript
import { request } from '@/utils/service'

interface UserRequestData {
  username: string
  password: string
}

export function accountLogin(data: UserRequestData) {
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}
```

### Encapsulated service.ts

`@/Utils/service.ts ` is based on axios, which encapsulates request interceptor, response interceptor, unified error handling, unified timeout handling, baseURL setting, CancelToken, etc.

## Multi-environment

### Build

When the project is developed and need build, there are two built-in environments: 

```sh
# build test environment
yarn build:test

# build production environment
yarn build:prod
```

### Variables

In the `.env.xxx` and other files, the variables corresponding to the environment are configured: 

```sh
# Interface corresponding to current environment baseURL
VUE_APP_BASE_API = 'https://www.xxx.com'
```

access：

```js
console.log(process.env.VUE_APP_BASE_API)
```

# ✈️ Advanced

## ESLint

Code specifications are important!

- Config item：Set in the `.eslintrc.js` file
- Cancel auto lint：Set `lintOnSave` to `false` in ` @/config/vue.custom.config.ts`
- The ESlint plug-in of VSCode is recommended here. When coding, it can mark the code that does not comply with the specification in red, and when you save the code, it will automatically help you repair some simple problematic code (VScode configuration ESlint tutorial can be found through Google)
- Perform lint manually：`yarn lint`（Execute this command before submitting the code, especially if your `lintOnSave` is `false`）

## Git Hooks

gitHooks is configured in `package. json`, and the code will be detected every time you commit

```json
"gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,jsx,vue,ts,tsx}": [
      "vue-cli-service lint",
      "git add"
    ]
  }
```

## Cross origin

Some built-in configuration items are stored in `@/config` folder, such as `white-list`(routing white list), `vue.custom.config` (vue.config file configuration), etc.

Use `proxy` in `vue.custom.config` for reverse proxy.

For the corresponding production environment, `nginx` can be used as the reverse proxy.

### Reverse proxy

```typescript
const vueDefaultConfig = {
  // ...other config
  devServer: {
    // ...other config
    proxy: {
      '/api/': {
        target: 'http://xxxxxx/api/',
        ws: true,
        pathRewrite: {
          '^/api/': ''
        },
        changeOrigin: true,
        secure: false
      }
    }
  }
}

module.exports = vueDefaultConfig
```

### CORS

This scheme has nothing special to do for the front end. It is no different from ordinary sending requests in writing. Most of the workload is on the server.
After completing [CORS](https://link.juejin.cn/?target=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2016%2F04%2Fcors.html), you can easily call the interface in either the development environment or the production environment.

## SVG

There are global `@/components/svg-icon` components, and the icons can be stored in `@/icons/svg`.

### Usage

There is no need to import components into the page, which can be used directly.

```html
<!-- name 为 svg 文件名 -->
<!-- class 可修改默认样式 -->
<svg-icon name="user" font-size="20px" class="icon" />
```

### Get more icons

Recommended use [iconfont](https://link.juejin.cn/?target=https%3A%2F%2Fwww.iconfont.cn%2F)

## Auto deployment

Fill in the **server IP, port, username, password** and other information in the `deploy/index. JS` file, and then execute the `yarn deploy` command to automatically publish dist file to the corresponding server.

> Note: the username, password and other information in this file are sensitive information and shouldn't be uploaded to the remote repositories, which is very important!

## Add new theme（Take dark theme as an example）

- New theme
  - `src/style/theme/dark/index.scss`
  - `src/style/theme/dark/setting.scss`
- Register the new theme
  - `src/style/theme/register.scss`
  - `src/config/theme.ts`

# ❓ Common problem

## All errors

Google can solve 99% of error reports.

## Dependency error

- Don't use cnpm
- Recommended use yarn
- Attempt to delete `node_modules` and install again
- Google search it

## When the routing mode is switched to browserhistory, a blank page appears after refreshing

Change the value of `publicPath` in the ` @/config/vue.custom.config.ts` file from `./` to`/`

