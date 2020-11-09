import Vue from 'vue'
import VueRouter from 'vue-router'
import Discovery from '../views/discovery'
import Mvs from '../views/mvs'
import Playlists from '../views/playlists'
import PlaylistDetail from '../views/playlists/detail'
import Songs from '../views/songs'

// 内容需要居中的页面
export const layoutCenterNames = ['discovery', 'playlists', 'songs', 'mvs']

// 侧边栏菜单的页面
export const menuRoutes = [
  {
    path: '/discovery',
    name: 'discovery',
    component: Discovery,
    meta: {
      title: '发现音乐',
      icon: 'music'
    }
  },
  {
    path: '/playlists',
    name: 'playlists',
    component: Playlists,
    meta: {
      title: '推荐歌单',
      icon: 'playlist-menu'
    },
    children: [
      {
        path: '/playlists/detail/:id',
        name: 'playlistDetail',
        component: PlaylistDetail
      }
    ]
  },
  {
    path: '/songs',
    name: 'songs',
    component: Songs,
    meta: {
      title: '最新音乐',
      icon: 'yinyue'
    }
  },
  {
    path: '/mvs',
    name: 'mvs',
    component: Mvs,
    meta: {
      title: '最新MV',
      icon: 'mv'
    }
  }
]

// hack router push callback
// 解决重复触发了同一个路由 控制台出现报错的情况 这个错误是 vur-router更新以后新出现的错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/discovery'
    },
    // {
    //   path: '/playlist/:id',
    //   name: 'playlist',
    //   component: PlaylistDetail
    // },
    // {
    //   path: '/search/:keywords',
    //   name: 'search',
    //   component: Search,
    //   props: true,
    //   children: [
    //     {
    //       path: '/',
    //       redirect: 'songs'
    //     },
    //     {
    //       path: 'songs',
    //       name: 'searchSongs',
    //       component: SearchSongs
    //     },
    //     {
    //       path: 'playlists',
    //       name: 'searchPlaylists',
    //       component: SearchPlaylists
    //     },
    //     {
    //       path: 'mvs',
    //       name: 'searchMvs',
    //       component: SearchMvs
    //     }
    //   ]
    // },
    // {
    //   path: '/mv/:id',
    //   name: 'mv',
    //   component: Mv,
    //   props: (route) =>  ({id: +route.params.id})
    // }
    ...menuRoutes
  ]
})
