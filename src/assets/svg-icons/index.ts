
// const requireComponent = require.context(
//   // 其组件目录的相对路径
//   './icons',
//   // 是否查询其子目录
//   true,
//   // 匹配基础组件文件名的正则表达式
//   /\.svg$/
// )

// const result = requireComponent.keys().map(requireComponent)

// export default function (app: any) {
//   app.config.globalProperties.$IconSvg = result.map(e => e.default.id)
// }

const requireAll = function(requireContext: any) {
  return requireContext.keys().map(requireContext)
}
const req = require.context('./icons', false, /\.svg$/)

requireAll(req)

export default req
