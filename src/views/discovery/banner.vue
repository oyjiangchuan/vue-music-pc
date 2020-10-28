<template>
  <el-carousel :interval="4000" type="card" class="banner-carousel">
    <el-carousel-item v-for="banner in banners" :key="banner.scm">
      <img
        :src="$utils.genImgUrl(banner.imageUrl, 1000, 400)"
        class="banner-img"
      />
    </el-carousel-item>
  </el-carousel>
</template>

<script type="text/ecmascript-6">
import { getBanner } from '@/api'
export default {
  data () {
    return {
      banners: []
    }
  },
  async mounted () {
    const { banners } = await getBanner()
    this.banners = banners
  }
}
</script>

<style style lang="scss" scoped>
.banner-carousel {
  ::v-deep.el-carousel__container {
    height: 200px;
  }

  .banner-img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}
</style>
