<!-- 发现音乐 -->
<template>
  <div class="discovery-wrapper">
    <Banner />
    <RecommendList />
    <NewSongs />
    <RecommendMV />
  </div>
</template>

<script type="text/ecmascript-6">
import Banner from './banner'
import RecommendList from './recommendList'
import NewSongs from './newSongs'
import RecommendMV from './recommendMV'
export default {
  name: 'discovery',
  components: { Banner, RecommendList, NewSongs, RecommendMV }
}
</script>

<style lang="scss" scoped>
.discovery-wrapper {
  padding: 18px 32px;
}
</style>
