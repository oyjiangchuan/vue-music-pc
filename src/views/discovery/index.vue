<template>
  <div class="discovery-wrapper">
    <Banner />
    <RecommendList />
  </div>
</template>

<script type="text/ecmascript-6">
import Banner from './banner'
import RecommendList from './recommendList'
export default {
  name: 'discovery',
  components: { Banner, RecommendList }
}
</script>

<style lang="scss" scoped>
.discovery-wrapper {
  padding: 18px 32px;
}
</style>
