<template>
  <div class="newSongs">
    <Title>最新音乐</Title>
    <div class="list-wrap">
      <div
        class="list"
        v-for="(list, listIndex) in thunkedList"
        :key="listIndex">
          <SongCard
            v-for="(item,index) in list"
            :key="item.id"
            class="song-card"
            :order="getSongOrder(listIndex, index)"
            v-bind="nomalizeSong(item)"
            @click.native="onClickSong(listIndex, index)"
          />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import SongCard from '@/components/song-card'
import { getNewSongs } from '@/api'
import { createSong } from '@/utils'

const songsLimit = 10

export default {
  data () {
    return {
      list: [],
      chunkLimit: Math.ceil(songsLimit / 2)
    }
  },
  async created () {
    const { result } = await getNewSongs()
    this.list = result
  },
  computed: {
    thunkedList () {
      return [this.list.slice(0, this.chunkLimit), this.list.slice(this.chunkLimit, this.list.length)]
    },
    normalizedSongs () {
      return this.list.map(song => this.nomalizeSong(song))
    }
  },
  methods: {
    nomalizeSong (song) {
      const {
        id,
        name,
        song: {
          mvid,
          artists,
          album: { blurPicUrl },
          duration
        }
      } = song
      return createSong({
        id,
        name,
        img: blurPicUrl,
        artists,
        duration,
        mvId: mvid
      })
    },
    getSongOrder (listIndex, index) {
      return listIndex * this.chunkLimit + index + 1
    },
    onClickSong (listIndex, index) {
      // 这里因为getSongOrder是从1开始显示, 所以当做数组下标需要减一
      const nomalizedSongIndex = this.getSongOrder(listIndex, index) - 1
      const nomalizedSong = this.normalizedSongs[nomalizedSongIndex]
      console.log('nomalizedSong', nomalizedSong) // 选中的歌曲
      // this.startSong(nomalizedSong)
      // this.setPlaylist(this.normalizedSongs)
    }
  },
  components: { SongCard }
}
</script>

<style lang="scss" scoped>
.newSongs {
  margin-bottom: 36px;
  .list-wrap {
    display: flex;

    .list {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
