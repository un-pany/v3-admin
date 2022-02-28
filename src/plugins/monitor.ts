import { init } from '@mitojs/browser'
import { vuePlugin } from '@mitojs/vue'

/** 监控插件 */
export default function loadComponent(app: any) {
  const MitoInstance = init(
    {
      vue: app, // vue 的根实例
      apikey: 'v3-admin', // 每个项目都应该有一个唯一值
      dsn: '/api/v1/monitor/upload', // 上报到服务端的 url
      maxBreadcrumbs: 100, // 默认值是20，如果设置的值大于100，将用100取代。表示最大用户行为栈的长度
      debug: false, // 当为 true 时将会在控制台打印收集到的数据，建议只在开发环境开启
      silentConsole: true // 默认会监控 console，为 true 时，将不再监控
    },
    [vuePlugin as any]
  );
  (window as any).MitoInstance = MitoInstance
}
