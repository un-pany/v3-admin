import { createApp } from 'vue'

/** 加载插件文件 */
export function loadAllPlugins(app: ReturnType<typeof createApp>) {
  const files = require['context']('.', true, /\.ts$/)
  files.keys().forEach((key: any) => {
    if (typeof files(key).default === 'function') {
      if (key !== './index.ts') files(key).default(app)
    }
  })
}
