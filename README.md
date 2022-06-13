## ✨ 新版

强烈推荐：基于 vite 的新版本 [v3-admin-vite](https://github.com/un-pany/v3-admin-vite)

## ⚡️ 简介

一个中后台管理系统基础解决方案，基于 Vue3、TypeScript、Element-Plus 和 Pinia

- Electron 桌面版: [v3-electron](https://github.com/un-pany/v3-electron)

## 📚 文档

[简体中文](https://juejin.cn/post/6963876125428678693) | [English Docs](./README.en.md)

## 国内仓库

[Gitee](https://gitee.com/un-pany/v3-admin)

## 预览

| 位置 | 账号 | 链接 |
| --- | --- | --- |
| github-pages | admin或editor | [链接](https://un-pany.github.io/v3-admin) |

## ⌛ 功能

```text
- 用户管理
  - 登录
  - 注销
	
- 权限验证
  - 页面权限
  - 指令权限

- 多环境
  - development
  - test
  - production
  
- 全局功能
  - svg
  - 多主题切换（内置黑暗主题）
  - 动态侧边栏
  - 动态面包屑
  - 标签页快捷导航
  - Screenfull 全屏
  - 自适应收缩侧边栏
  - 前端监控（基于 mitojs）

- 错误页面
  - 401
  - 404

- Dashboard
  - admin
  - editor

- 自动部署
```

## 目录结构

```
# v3-admin
├─ .env.development   # 开发环境
├─ .env.production    # 正式环境
├─ .env.test          # 测试环境
├─ .eslintrc.js       # eslint
├─ deploy             # 自动部署
├─ public
│  ├─ favicon.ico
│  ├─ index.html
├─ src
│  ├─ @types          # ts 声明
│  ├─ api             # api 接口
│  ├─ assets          # 静态资源
│  ├─ components      # 全局组件
│  ├─ config          # 全局配置
│  ├─ constant        # 常量/枚举
│  ├─ directives      # 全局指令
│  ├─ icons           # svg icon
│  ├─ layout          # 布局
│  ├─ model           # 全局 model
│  ├─ plugins         # 插件
│  ├─ router          # 路由
│  ├─ store           # pinia store
│  ├─ styles          # 全局样式
│  ├─ utils           # 全局公共方法
│  └─ views           # 所有页面
│  ├─ App.vue         # 入口页面
│  ├─ main.ts         # 入口文件
│  └─ shims.d.ts      # 模块注入
├─ tsconfig.json      # ts 编译配置
└─ vue.config.js      # vue-cli 配置
```

## 🚀 开发

```bash
# 配置
1. 安装 eslint 插件
2. 安装 volar 插件
3. node v16.x
4. pnpm v6.x

# 克隆项目
git clone https://github.com/un-pany/v3-admin.git

# 进入项目目录
cd v3-admin

# 安装依赖
pnpm i

# 启动服务
pnpm dev
```

## 📦️ 多环境打包

```bash
# 构建测试环境
pnpm build:test

# 构建生产环境
pnpm build:prod
```

## 🔧 代码格式检查

```bash
pnpm lint
```

## ✈️ 自动部署

```bash
pnpm deploy
```

## Git 提交规范

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中
- `mod` 不确定分类的修改

## 站在巨人的肩膀上

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- [vue3-composition-admin](https://github.com/rcyj-FED/vue3-composition-admin)
- [vue-vben-admin](https://github.com/anncwb/vue-vben-admin)
- [d2-admin](https://github.com/d2-projects/d2-admin)
- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)
- [vue3-antd-admin](https://github.com/buqiyuan/vue3-antd-admin)

## 交流（吹水）群

QQ群：1014374415

![v3-admin.png](https://github.com/un-pany/v3-admin/blob/master/src/assets/docs/qq.png)

## 📄 License

[MIT](https://github.com/un-pany/v3-admin/blob/master/LICENSE)

Copyright (c) 2021 UNPany
