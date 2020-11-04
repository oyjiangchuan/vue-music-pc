<template>
  <div class="recommendMV">
    <Title>推荐MV</Title>
    <ul class="list-wrap">
      <li
        class="list-item"
        v-for="mv in mvs"
        :key="mv.id"
      >
        <!-- <MvCard
          :author="mv.artistName"
          :id="mv.id"
          :img="mv.picUrl"
          :name="mv.name"
          :playCount="mv.playCount"
        /> -->
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import { getPersonalizedMv } from '@/api'
// import MvCard from '@/components/mv-card'
export default {
  created () {
    this.getMvs()
  },
  data () {
    return {
      mvs: []
    }
  },
  methods: {
    async getMvs () {
      const { result } = await getPersonalizedMv()
      this.mvs = result
    }
  }
  // components: { MvCard }
}
</script>

<style lang="scss" scoped>
.recommendMV {
  @include list(25%);
}
</style>
