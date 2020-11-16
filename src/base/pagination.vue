<template>
  <div class="pagination">
    <el-pagination
      :pageSize="pageSize"
      :total="total"
      layout="prev, pager, next"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Pagination',
  props: ['pageSize', 'total']
}
</script>

<style lang="scss" scoped>
.pagination {
  text-align: right;
}
</style>
