// const WorkboxPlugin = require('workbox-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

// const path = require('path')

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devtool: isProd ? false : 'source-map',
    devServer: {
      open: true,
      proxy: {
        '/netease-api': {
          // target: 'http://musicapi.leanapp.cn', // 网易云公网API地址
          target: 'https://api.mtnhao.com/', // 网易云公网API地址
          pathRewrite: { '^/netease-api': '' },
          changeOrigin: true,
          secure: false
        }
      },
      port: 8080
    },
    externals: isProd ? {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios'
    } : {}
    // plugins: [
    //   new WorkboxPlugin.GenerateSW(
    //     {
    //       importWorkboxFrom: 'local',
    //       skipWaiting: true,
    //       clientsClaim: true,
    //       runtimeCaching: [
    //         {
    //           // To match cross-origin requests, use a RegExp that matches
    //           // the start of the origin:
    //           urlPattern: new RegExp('^https://api'),
    //           handler: 'staleWhileRevalidate',
    //           options: {
    //             // Configure which responses are considered cacheable.
    //             cacheableResponse: {
    //               statuses: [200]
    //             }
    //           }
    //         },
    //         {
    //           urlPattern: new RegExp('^https://cdn'),
    //           // Apply a network-first strategy.
    //           handler: 'networkFirst',
    //           options: {
    //             // Fall back to the cache after 2 seconds.
    //             networkTimeoutSeconds: 2,
    //             cacheableResponse: {
    //               statuses: [200]
    //             }
    //           }
    //         }
    //       ]
    //     }
    //   )
    // ]
    /*
      首先 importWorkboxFrom 我们指定从本地引入，
      这样插件就会将 workbox 所有源文件下载到本地，墙内开发者的福音。
      上面提到过新 Service Worker 安装成功后需要进入等待阶段，
      skipWaiting: true 将使其跳过等待，安装成功后立即接管网站，注意这个要和 clientsClaim 一起设置为 true。
      runtimeCaching 顾名思义是配置运行时如何缓存请求的，这里只说一点，
      缓存跨域请求时 urlPattern 的值必须为 ^ 开头的正则表达式，其它的配置看文档都能得到详细的介绍
      https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW#GenerateSW
    */
  },
  // pluginOptions: { // 也可以使用style-resources-loader插件这种方式把scss定义的全局变量注入到全局中 还要配合使用vue-cli-plugin-style-resources-loader插件
  //   'style-resources-loader': {
  //     preProcessor: 'scss',
  //     patterns: path.resolve(__dirname, 'src/style/scss/*.scss')
  //   }
  // },
  css: {
    loaderOptions: {
      sass: {
        // 将variables.scss中定义的全局变量和mixin.scss中定义的一些共用的样式(混入用法 @mixin定义----@include调用 支持传入参数和函数的用法相似) 注入到全局中 不用在需要使用的地方引用了
        // sass 版本 9 中使用 additionalData 版本 8 中使用 prependData 版本 7 中使用 data
        prependData: `
          @import "~@/style/variables.scss";
          @import "~@/style/mixin.scss";
        `
      }
    }
  }
}
