<!-- 歌单详情 -->
<template>
  <div class="playlist-detail" v-if="playlist.id">
    <DetailHeader :playlist="playlist" ref="header"></DetailHeader>
  </div>
</template>

<script type="text/ecmascript-6">
import DetailHeader from './header'
import { getListDetail } from '@/api'
import { scrollInto } from '@/utils'
export default {
  name: 'playlistDetail',
  metaInfo () { // metaInfo用法
    return {
      title: this.playlist.name
    }
  },
  data () {
    return {
      playlist: {},
      searchValue: ''
    }
  },
  async created () {

  },
  methods: {
    async init () {
      const { playlist } = await getListDetail({ id: this.id })
      this.playlist = playlist
    },
    scrollToHeader () {
      const { header } = this.$refs
      if (header) {
        scrollInto(header.$el)
      }
    }
  },
  computed: {
    id () {
      return Number(this.$route.params.id)
    }
  },
  watch: {
    id: {
      handler () {
        // this.searchValue = ""
        this.init()
        this.scrollToHeader()
      },
      immediate: true
    }
  },
  components: { DetailHeader }
}
</script>

<style lang="scss" scoped>
.playlist-detail {
  width: 100%;
}
</style>
