<template>
  <div class="commonts-wrap">
    评论啊
  </div>
</template>

<script type="text/ecmascript-6">

const SONG_TYPE = 'song'
// const PLAYLIST_TYPE = 'playlist'
// const MV_TYPE = 'mv'

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    type: {
      // SONG_TYPE, PLAYLIST_TYPE, MV_TYPE 之一
      type: String,
      default: SONG_TYPE
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
