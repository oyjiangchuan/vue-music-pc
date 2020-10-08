import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// 内容需要居中的页面
export const layoutCenterNames = ['discovery', 'playlists', 'songs', 'mvs']

// 侧边栏菜单的页面
export const menuRoutes = [
  {
    path: '/discovery',
    name: 'discovery',
    component: Home,
    meta: {
      title: '发现音乐',
      icon: 'music'
    }
  }
  // {
  //   path: '/playlists',
  //   name: 'playlists',
  //   component: Playlists,
  //   meta: {
  //     title: '推荐歌单',
  //     icon: 'playlist-menu'
  //   }
  // },
  // {
  //   path: '/songs',
  //   name: 'songs',
  //   component: Songs,
  //   meta: {
  //     title: '最新音乐',
  //     icon: 'yinyue'
  //   }
  // },
  // {
  //   path: '/mvs',
  //   name: 'mvs',
  //   component: Mvs,
  //   meta: {
  //     title: '最新MV',
  //     icon: 'mv'
  //   }
  // }
]

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
