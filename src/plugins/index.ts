/* 加载插件文件 */

import { createApp } from 'vue'

export function loadAllPlugins(app: ReturnType<typeof createApp>) {
  const files = require['context']('.', true, /\.ts$/)
  files.keys().forEach((key: any) => {
    if (typeof files(key).default === 'function') {
      if (key !== './index.ts') files(key).default(app)
    }
  })
}
