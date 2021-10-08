/* vue.config 文件配置 */

const vueDefaultConfig = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true, // 是否开启 eslint 自动校验
  productionSourceMap: false, // 不输出 map 文件，以加速生产环境构建
  title: 'v3-admin', // webpack 配置的项目名称
  devServer: {
    publicPath: '/',
    hot: true,
    port: '9999',
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
    // proxy: { // 反向代理
    //   '/mock-api/': {
    //     target: 'https://vue-typescript-admin-mock-server-armour.vercel.app/mock-api',
    //     ws: true,
    //     pathRewrite: {
    //       '^/mock-api/': ''
    //     },
    //     changeOrigin: true,
    //     secure: false
    //   }
    // }
  }
}

module.exports = vueDefaultConfig
