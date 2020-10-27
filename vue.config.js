const WorkboxPlugin = require('workbox-webpack-plugin')

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
          target: 'http://musicapi.leanapp.cn', // 网易云公网API地址
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
    } : {},
    plugins: [
      new WorkboxPlugin.GenerateSW()
    ]
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
