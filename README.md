> 一个管理端模板解决方案，它是基于 vue3, ts 和 element-plus，项目是以 composition api 风格编写

## 简介

项目改进自 [vue3-composition-admin minimal分支](https://github.com/rcyj-FED/vue3-composition-admin/tree/minimal)

### 目录结构

```
vue-admin
├─ .env.dev.build     # 开发环境
├─ .env.dev.serve     # 开发本地本地
├─ .env.prod.build    # 生产环境
├─ .env.prod.serve    # 生产环境本地
├─ .env.test.build    # 测试环境
├─ .env.test.serve    # 测试环境本地
├─ .eslintrc.js       # eslint
├─ README.md          
├─ dist               # 打包dist
├─ public             # 静态资源
├─ src                # 源码
│  ├─ @types          # ts 声明
│  ├─ apis            # 接口请求
│  ├─ assets          # webpack打包的资源
│  ├─ components      # 公共组件
│  ├─ config          # 全部配置
│  ├─ constant        # 常量/枚举
│  ├─ directives      # 全局指令
│  ├─ layout          # 全局Layout
│  ├─ locales         # 国际化
│  ├─ model           # 全部model存放
│  ├─ plugins         # 插件
│  ├─ router          # 路由
│  ├─ store           # 全局store管理
│  ├─ styles          # 全局样式
│  ├─ utils           # 全局公共方法
│  └─ views           # 所有业务页面
├─ tsconfig.json      # ts 编译配置
└─ vue.config.js      # vue-cli 配置

```

## HighLight

项目均已最新技术实现，Vue3配套升级全家桶和涉及的插件组件等

项目采用技术:

- vue3 + composition api
- typescript 4
- sass (dart sass)

vue next 系列:

- [element-plus](https://github.com/element-plus/element-plus)
- [vue-router-next](https://github.com/vuejs/vue-router-next)
- [vuex-4.0](https://github.com/vuejs/vuex)
- [vue-vue-i18n-next](https://github.com/panter/vue-i18next)


## Document

- [文档地址](https://rcyj-fed.github.io/vue3-composition-admin-docs/)


## 启动 vue admin

```shell
    yarn  serve:dev
```
or
```shell
    npm run serve:dev
```

### eslint

```shell
    yarn  lint
```
or
```shell
    npm run lint
```


提交自动检测：

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