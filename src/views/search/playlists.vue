<template>
  <div class="playlists-wrap">
    <WithPagination
      :getData="getSearch"
      :getDataParams="searchParams"
      :limit="30"
      :scrollTarget="searchRoot.$refs && searchRoot.$refs.header"
      :total="songCount"
      @getDataSuccess="onGetSearch"
    >
      <div class="table">
        <SongTable
          :highlightText="keywords"
          :renderNameDesc="renderNameDesc"
          :songs="songs"
          :stripe="true"
        />
      </div>
    </WithPagination>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSearch } from '@/api'
import { createSong } from '@/utils'
import SongTable from '@/components/song-table'
import WithPagination from '@/components/with-pagination'
export default {
  inject: ['searchRoot'],
  created () {
    this.getSearch = getSearch
  },
  data () {
    return {
      songs: [],
      songCount: 0,
      currentPage: 1
    }
  },
  methods: {
    onGetSearch (result) {
      const { result: { songs, songCount } } = result
      this.songs = songs.map(song => {
        const { id, mvid, name, alias, artists, duration, album } = song
        return createSong({
          id,
          name,
          alias,
          artists,
          duration,
          mvId: mvid,
          albumName: album.name,
          albumId: album.id
        })
      })
      this.songCount = songCount
      this.searchRoot.onUpdateCount(songCount)
    },
    renderNameDesc (scope) {
      const { alias } = scope.row
      return alias.map(desc => (
        <HighlightText
          class="name-desc"
          text={desc}
          highlightText={this.keywords}
        />
      ))
    }
  },
  computed: {
    keywords () {
      return this.searchRoot.keywords
    },
    searchParams () {
      return { keywords: this.keywords }
    }
  },
  components: { SongTable, WithPagination }
}
</script>

<style lang="scss" scoped>
.playlists-wrap {
  max-width: 1000px;
  padding: $page-padding;
  margin: auto;
}
</style>
