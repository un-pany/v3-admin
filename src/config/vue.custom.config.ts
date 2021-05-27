/* vue.config 文件配置 */

const vueDefaultConfig = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  // webpack 配置的项目名称
  title: 'v3-admin',
  titleSeparator: ' - ',
  titleReverse: false,
  abbreviation: 'vt2at',
  providePlugin: {},
  build7z: false,
  startMessage: '欢迎使用 v3-admin',
  devServer: {
    publicPath: '/',
    hot: true,
    port: '9999',
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    }
    // proxy: {
    //   '/api/': {
    //     target: 'http://xxxxxx/api/',
    //     ws: true,
    //     pathRewrite: {
    //       '^/api/': ''
    //     },
    //     changeOrigin: true,
    //     secure: false
    //   }
    // }
  }
}

module.exports = vueDefaultConfig
