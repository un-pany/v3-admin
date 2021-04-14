/* 配置文件 */
const { resolve } = require('path')
const path = require('path')
const WebpackBar = require('webpackbar');
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
  configureWebpack(){
    return {
      resolve:{
        alias:{
          '@':resolve('src'),
          '*':resolve(''),
          'Assets':resolve('src/assets'),
          'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js' //解决警告You are running the esm-bundler build of vue-i18n.
        }
      },
      module:{
        rules: [
          {
            test: /\.(json5?|ya?ml)$/, // target json, json5, yaml and yml files
            loader: '@intlify/vue-i18n-loader',
            include: [ // Use `Rule.include` to specify the files of locale messages to be pre-compiled
              path.resolve(__dirname, 'src/lang')
            ]
          }
        ]
      },
      plugins:[
        new WebpackBar({
          name:title,
        })
      ]
    }
  },
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/svg-icons/icons')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end()
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({ extract: false }).end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin')), [{ pluginSprite: true }]
    config.module.rule('svg').exclude.add(dir)
  }
}
