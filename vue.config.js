/* 配置文件 */
const { resolve } = require('path')
const path = require('path')
const WebpackBar = require('webpackbar')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const dayjs = require('dayjs')
const time = dayjs().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_UPDATE_TIME = time
const  {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
  devPort,
} = require('./src/config/vue.custom.config.ts')
module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss'),
      ]
    }
  },
  configureWebpack: () => {
    const configNew = {}
    if (process.env.NODE_ENV === 'production') {
      configNew.plugins = [
        // gzip
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        }),
        new WebpackBar({
          name:title
        })
      ]
    }
    return configNew
  },
  chainWebpack: config => {
    // 开发环境 sourcemap 不包含列信息
    config.when(process.env.NODE_ENV === 'development',
      config => config.devtool('cheap-source-map')
    )
    // 重新设置 alias
    config.resolve.alias
      .set('@api', resolve('src/api'))
      .set('@', resolve('src'))
      .set('Assets', resolve('src/assets'))
    
    // json, json5, yaml and yml files
    const jsonRule = config.module.rule('json')
    jsonRule.test(/\.(json5?|ya?ml)$/)
      .use('@intlify/vue-i18n-loader')
      .include
      .add(path.resolve(__dirname, 'src/lang'))
      .end()
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
      .set('$i18n', 'vue-i18n/dist/vue-i18n.esm-bundler.js')
    // svg
    const dir = path.resolve(__dirname, 'src/assets/svg-icons/icons')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include
      .add(dir)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader').
      options({ extract: false })
      .end()
    config.plugin('svg-sprite')
      .use(require('svg-sprite-loader/plugin')), [{ pluginSprite: true }]
    config.module.rule('svg').exclude.add(dir)

    // 将运行代码单独生成文件
    if (process.env.NODE_ENV !== 'development') {
      config.optimization.runtimeChunk('single')
    }
  },
  // 不输出 map 文件
  productionSourceMap: false
}
