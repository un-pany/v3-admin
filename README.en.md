> Upgrading the plugin vetur to **volar** will better support vue3.2

# ⚡️ Introduction

A basic solution for middle and background management system, based on vue3, typescript, element plus and Vue cli 4.5

## Documentation

[简体中文(掘金)](https://juejin.cn/post/6963876125428678693) | English

## preview

| position     | account                 | link                                           |
| ------------ | ----------------------- | ---------------------------------------------- |
| github-pages | **admin** or **editor** | [link](https://un-pany.github.io/v3-admin) |

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
git clone https://github.com/un-pany/v3-admin

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

### Dynamic routes

## Sidebar and breadcrumb

### Sidebar

### Sidebar external links

### Breadcrumb

## Permission

### Role permission control

### Cancel the role feature

### Directive permissions

## Send HTTP request

###  Common management API

### Encapsulated service.ts

## Multi-environment

### Build

### Variables

# ✈️ Advanced

## ESLint

## Git Hooks

## Cross origin

### Reverse proxy

### CORS

## SVG

## Add new theme（Take dark theme as an example）

## Auto deployment

# ❓ Common problem

## All errors

## Dependency error

## When the routing mode is switched to browserhistory, a blank page appears after refreshing

# ☕ Other

## Reference

