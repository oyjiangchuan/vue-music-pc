<!-- 最新音乐 -->
<template>
  <div class="songs-wrapper">
    <div class="tabs">
      <Tabs
        :tabs="tabs"
        @tabChange="getSongs"
        align="right"
        type="small"
        v-model="activeTabIndex"
      />
    </div>
    <SongTable
      :songs="songs"
      header-row-class-name="header-row"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import { getTopSongs } from '@/api'
import { createSong } from '@/utils'
import SongTable from '@/components/song-table'
export default {
  name: 'songs',
  components: { SongTable },
  data () {
    return {
      tabs: [
        { title: '全部', type: 0 },
        { title: '华语', type: 7 },
        { title: '欧美', type: 96 },
        { title: '日本', type: 8 },
        { title: '韩国', type: 16 }
      ],
      activeTabIndex: 0,
      songs: []
    }
  },
  async created () {
    this.getSongs()
  },
  methods: {
    async getSongs () {
      const { data } = await getTopSongs(this.tabs[this.activeTabIndex].type)
      this.songs = data.map(song => {
        const {
          id,
          name,
          artists,
          duration,
          mvid,
          album: { picUrl, name: albumName }
        } = song
        return createSong({
          id,
          name,
          artists,
          duration,
          albumName,
          img: picUrl,
          mvId: mvid
        })
      })
    }
  }
}
</script>

<style lang="scss">
.songs-wrapper {
  padding: 12px;

  .header-row {
    display: none;
  }
}
</style>
