<template>
  <div class="recommend">
    <Title>推荐歌单</Title>
    <div class="list-wrap">
      <PlaylistCard
        v-for="item in list"
        :desc="item.copywriter"
        :id="item.id"
        :img="item.picUrl"
        :key="item.id"
        :name="item.name"
      />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import PlaylistCard from '@/components/playlist-card'
import { getRecommendList } from '@/api'
export default {
  data () {
    return {
      list: []
    }
  },
  async created () {
    const { result } = await getRecommendList({ limit: 10 })
    this.list = result
  },
  components: { PlaylistCard }
}
</script>

<style lang="scss" scoped>
.list-wrap {
  margin: 0 -4px;
  display: flex;
  flex-wrap: wrap;
}
</style>
