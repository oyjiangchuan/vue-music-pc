import store from '@/store'

// 隐藏菜单
export const hideMenuMixin = {
  created () {
    store.commit('music/setMenuShow', false)
  },
  beforeDestroy () {
    store.commit('music/setMenuShow', true)
  }
}
// 隐藏播放器
export const hideMiniPlayerMixin = {
  created () {
    store.commit('music/setMiniPlayerShow', false)
  },
  beforeDestroy () {
    store.commit('music/setMiniPlayerShow', false)
  }
}
