<template>
  <div class="search-wrap">
    <div class="header" ref="header">
      <span class="keywords">{{ keywords }}</span>
      <span class="found">找到{{ count }}个结果</span>
    </div>
    <div class="tabs-wrap">
      <Tabs
        :tabs="tabs"
        itemClass="search-tab-item"
      />
    </div>
    <Empty
      class="empty"
      v-if="showEmpty"
    >暂无结果</Empty>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState as mapGlobalState } from '@/store/helper/global'
export default {
  props: ['keywords'], // 可以通过props获取，也可以通过this.$route.params获取
  provide () {
    return {
      searchRoot: this
    }
  },
  data () {
    return {
      tabs: [
        {
          title: '歌曲',
          key: 'songs',
          to: 'songs'
        },
        {
          title: '歌单',
          key: 'playlists',
          to: 'playlists'
        },
        {
          title: 'MV',
          key: 'mvs',
          to: 'mvs'
        }
      ],
      count: 0
    }
  },
  methods: {
    onUpdateCount (count) {
      this.count = count
    }
  },
  computed: {
    showEmpty () {
      return !this.axiosLoading && this.count === 0
    },
    ...mapGlobalState(['axiosLoading'])
  }
}
</script>

<style lang="scss" scoped>
.search-wrap {
  .header {
    padding: 20px 32px;

    .keywords {
      display: inline-block;
      margin-right: 4px;
      font-size: $font-size-title-lg;
      font-weight: $font-weight-bold;
    }

    .found {
      font-size: $font-size-sm;
      color: var(--font-color-grey-shallow);
      letter-spacing: 2px;
    }
  }

  .tabs-wrap {
    padding: 0 28px;
    border-bottom: 1px solid var(--border);

    :v-deep.search-tab-item {
      font-size: $font-size;
    }
  }
}
</style>
