<!-- 最新MV -->
<template>
<div class="mvs-root">
  <div class="mvs-wrapper" ref="page" v-if="this.$route.path === '/mvs'">
    <div class="tabs-wrap">
      <span class="tabs-type">地区：</span>
      <Tabs
        :tabs="areaTabs"
        class="tabs"
        type="split"
        v-model="activeAreaTabIndex"
      />
    </div>
    <div class="tabs-wrap">
      <span class="tabs-type">类型：</span>
      <Tabs
        :tabs="typeTabs"
        class="tabs"
        type="split"
        v-model="activeTypeTabIndex"
      />
    </div>
    <div class="tabs-wrap">
      <span class="tabs-type">排序：</span>
      <Tabs
        :tabs="sortTabs"
        class="tabs"
        type="split"
        v-model="activeSortTabIndex"
      />
    </div>
    <WithPagination
      :getData="getAllMvs"
      :getDataParams="getDataParams"
      :limit="40"
      :scrollTarget="this.$refs && this.$refs.page"
      :total="mvCount"
      @getDataSuccess="onGetMvs"
    >
      <ul class="list-wrap">
        <li class="list-item" v-for="mv in mvs" :key="mv.id">
          <MvCard
            :author="mv.artistName"
            :duration="mv.duration"
            :id="mv.id"
            :img="mv.cover"
            :name="mv.name"
            :playCount="mv.playCount"
          />
        </li>
      </ul>
    </WithPagination>
  </div>
  <router-view v-else></router-view>
</div>
</template>

<script type="text/ecmascript-6">
import { getAllMvs } from '@/api'
import MvCard from '@/components/mv-card'
import WithPagination from '@/components/with-pagination'
export default {
  name: 'mvs',
  data () {
    return {
      areaTabs: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      typeTabs: ['全部', '官方版', '原声', '现场版', '网易出品'],
      sortTabs: ['上升最快', '最热', '最新'],
      activeAreaTabIndex: 0,
      activeTypeTabIndex: 0,
      activeSortTabIndex: 0,
      mvs: [],
      mvCount: 0
    }
  },
  created () {
    this.getAllMvs = getAllMvs
  },
  computed: {
    getDataParams () {
      return {
        area: this.areaTabs[this.activeAreaTabIndex],
        order: this.sortTabs[this.activeSortTabIndex],
        type: this.typeTabs[this.activeTypeTabIndex]
      }
    }
  },
  methods: {
    onGetMvs ({ data, count }) {
      this.mvs = data
      if (count) {
        this.mvCount = count
      }
    }
  },
  components: { WithPagination, MvCard }
}
</script>

<style lang="scss" scoped>
.mvs-wrapper {
  padding: $page-padding;
  margin: auto;

  .tabs-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    .tabs-type {
      font-size: $font-size-sm;
    }
  }

  @include list(25%);
}
</style>
