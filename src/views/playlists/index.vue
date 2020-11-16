<!-- 推荐歌单 -->
<template>
  <div class="playlists-root">
    <div class="playlists-wrapper" ref="playlists" v-if="this.$route.path === '/playlists'">
      <div class="top-play-list-card">
        <TopPlaylistCard
          :desc="topPlaylist.description"
          :id="topPlaylist.id"
          :img="topPlaylist.coverImgUrl"
          :name="topPlaylist.name"
        />
      </div>
      <div class="tabs">
        <Tabs
         :tabs="tabs"
         v-model="activeTabIndex"
         @tabChange="onTabChange"
         align="right"
         type="small"
        />
      </div>
      <div class="playlist-cards">
        <PlaylistCard
          :desc="`播放量：${$utils.formatNumber(item.playCount)}`"
          :id="item.id"
          :img="item.coverImgUrl"
          :key="item.id"
          :name="item.name"
          v-for="item in playlists"
        />
      </div>
      <Pagination
        class="pagination"
        :current-page.sync="currentPage"
        :page-size="PAGE_SIZE"
        :total="total"
        @current-change="onPageChange"
      ></Pagination>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { getPlaylists, getTopPlaylists } from '@/api'
import { getPageOffset, scrollInto } from '@/utils'
import PlaylistCard from '@/components/playlist-card'
import TopPlaylistCard from '@/components/top-playlist-card'
const PAGE_SIZE = 50
const tabs = [
  '全部',
  '欧美',
  '华语',
  '流行',
  '说唱',
  '摇滚',
  '民谣',
  '电子',
  '轻音乐',
  '影视原声',
  'ACG',
  '怀旧',
  '治愈',
  '旅行'
]
export default {
  name: 'playlists',
  data () {
    return {
      PAGE_SIZE,
      tabs,
      activeTabIndex: 0,
      playlists: [],
      currentPage: 0,
      total: 0,
      topPlaylist: {}
    }
  },
  async created () {
    this.initData()
  },
  methods: {
    async initData () {
      this.getPlaylists()
      this.getTopPlaylists()
    },
    async getPlaylists () {
      const { playlists, total } = await getPlaylists({
        limit: PAGE_SIZE,
        offset: getPageOffset(this.currentPage, PAGE_SIZE),
        cat: this.tabs[this.activeTabIndex]
      })
      this.playlists = playlists
      this.total = total
    },
    async getTopPlaylists () {
      const { playlists } = await getTopPlaylists({
        limit: 1,
        cat: this.tabs[this.activeTabIndex]
      })
      this.topPlaylist = playlists[0] || {}
    },
    // 分页只重新获取歌单列表
    async onPageChange (page) {
      this.currentPage = page
      this.getPlaylists()
      scrollInto(this.$refs.playlists)
    },
    onTabChange () {
      this.initData()
    }
  },
  components: { PlaylistCard, TopPlaylistCard }
}
</script>

<style lang="scss" scoped>
.playlists-wrapper {
  padding: 12px;

  .top-play-list-card {
    margin-bottom: 16px;
  }

  .playlist-cards {
    display: flex;
    flex-wrap: wrap;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 36px;
  }
}
</style>
