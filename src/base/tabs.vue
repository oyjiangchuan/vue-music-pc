<template>
  <ul class="tab-wrap"></ul>
</template>

<script type="text/ecmascript-6">
// const ACTIVE_PROP = 'active'
// const ACTIVE_CHANGE = 'tabChange'
// const ROUTE_ACTIVE_CLS = 'active'
export default {
  name: 'Tabs',
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
