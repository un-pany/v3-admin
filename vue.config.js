/* 配置文件 */
const path = require('path')
const WebpackBar = require('webpackbar')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true, // 是否开启 eslint 自动校验
  productionSourceMap: false, // 不输出 map 文件，以加速生产环境构建
  devServer: {
    devMiddleware: {
      publicPath: '/',
    },
    hot: true,
    port: '9999',
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
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
  },
  configureWebpack: () => {
    const config = {
      name: 'v3-admin', // webpack 配置的项目名称, 可以在 index.html 中被访问，用来注入页面标题
      resolve: {
        fallback: {
          path: require.resolve('path-browserify')
        }
      }
    };
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [
        new WebpackBar({
          name: 'v3-admin' // webpack 配置的项目名称
        })
      ]
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
      .loader('svg-sprite-loader')
      .options({ extract: false })
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
