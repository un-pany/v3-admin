declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.gif' {
  export const gif: any
}

declare module '*.svg' {
  const content: any
  export default content
}
