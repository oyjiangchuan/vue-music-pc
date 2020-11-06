<template>
  <div class="search">
    <el-input
      @click.native="onClickInput"
      @input="onInput"
      @keypress.native.enter="onEnterPress"
      placeholder="搜索"
      prefix-icon="el-icon-search"
      ref="input"
      v-model.trim="searchKeyword"
      ></el-input>
      <Toggle
        :reserveDoms="[$refs.input && $refs.input.$el]"
        :show.sync="searchPanelShow"
      >
        <div class="search-panel" v-show="!searchPanelShow">
          <div class="search-hots">
            <div class="block">
              <p class="title">热门搜索</p>
              <div class="tags">
                <NButton
                  class="button"
                  :key="index"
                  v-for="(hot, index) in searchHots"
                  @click="onClickHot(hot)"
                >{{hot}}</NButton>
              </div>
            </div>
            <div class="block">
            </div>
          </div>
        </div>
      </Toggle>
  </div>
</template>

<script>
// import storage from 'good-storage'
export default {
  data () {
    return {
      searchKeyword: '',
      searchPanelShow: '',
      searchHots: [
        '搜索历史',
        '搜索历史',
        '搜索历史',
        '搜索历史',
        '搜索历史',
        '搜索历史',
        '搜索历史'
      ]
    }
  },
  methods: {
    onClickInput () {},
    onInput () {},
    onEnterPress () {},
    onClickHot (hot) {
      console.log('hot', hot)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  width: 150px;
  position: relative;

  .search-panel {
    position: fixed;
    top: $header-height;
    bottom: $mini-player-height;
    right: 0;
    width: 350px;
    background: var(--search-bgcolor);
    z-index: $search-panel-z-index;
    font-size: $font-size-sm;
    overflow-y: auto;
    @include box-shadow;

    .block {
      padding: 16px 24px;

      .title {
        color: var(--font-color-grey);
        margin-bottom: 16px;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;

        .button {
          margin-bottom: 12px;
          margin-right: 6px;
          font-size: $font-size-sm;
        }
      }
    }
  }
}
</style>
