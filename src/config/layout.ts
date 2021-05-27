/* 布局配置 */

interface LayoutSettings {
  // 控制 settings panel 显示
  showSettings: boolean
  // 控制 tagsview 显示
  showTagsView: boolean
  // 控制 siderbar logo 显示
  showSidebarLogo: boolean
  // 如果为真，将修复 header component
  fixedHeader: boolean
  // 如果为真，将根据 theme 更改 sidebar 的 active text color
  sidebarTextTheme: boolean
  // 控制 中英文切换 显示
  langSelect: boolean
}

const layoutSettings: LayoutSettings = {
  showSettings: true,
  showTagsView: true,
  fixedHeader: false,
  showSidebarLogo: true,
  sidebarTextTheme: false,
  langSelect: true
}

export default layoutSettings