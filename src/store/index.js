import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  },
  plugins: debug ? [createLogger()] : [] // 可以创建每次mutation改变state的log-效果: 控制台打印-只在开发环境使用
})
