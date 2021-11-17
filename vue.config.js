/* 配置文件 */
const path = require('path')
const WebpackBar = require('webpackbar')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  productionSourceMap,
  title,
  devServer
} = require('./src/config/vue.custom.config.ts')

module.exports = {
  publicPath,
  outputDir,
  assetsDir,
  lintOnSave,
  productionSourceMap,
  devServer,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/variables.scss'),
        path.resolve(__dirname, 'src/styles/mixins.scss'),
      ]
    }
  },
  configureWebpack: () => {
    const config = {
      name: title // 可以在 index.html 中被访问，用来注入页面标题
    }
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [
        new WebpackBar({
          name: title
        }),
        // gzip
        // new CompressionWebpackPlugin({
        //   filename: '[path][base].gz',
        //   test: /\.(js|css)?$/i,
        //   threshold: 10240,
        //   minRatio: 0.8,
        //   deleteOriginalAssets: true
        // })
      ],
      // 生产环境清除 console.log
      config.optimization = {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              mangle: true,
              compress: {
                warnings: false,
                drop_console: false,
                drop_debugger: false,
                pure_funcs: ['console.log'] // 清除 console.log
              },
              output: {
                comments: false // 删除注释
              }
            }
          })
        ]
      }
    }
    return config
  },
  chainWebpack: config => {
    // 当有很多页面时，它会导致太多毫无意义的请求
    config.plugins.delete('prefetch')
    // 开发环境 sourcemap 不包含列信息
    config.when(process.env.NODE_ENV === 'development',
      config => config.devtool('cheap-source-map')
    )
    // svg
    const dir = path.resolve(__dirname, 'src/icons/svg')
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
  }
}
