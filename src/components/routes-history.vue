<template>
  <div class="routes-history">
    <Icon
      class="icon"
      :backdrop="true"
      type="back"
      @click="back"
    />
    <Icon
      :backdrop="true"
      type="forward"
      @click="forword"
    />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    back () {
      console.log('go pre router')
      // this.$router.back()
    },
    forword () {
      console.log('go next router')
      // this.$router.forword()
    }
  }
}
</script>

<style lang="scss" scoped>
.routes-history {
  display: flex;
  align-items: center;

  .icon {
    margin-right: 16px;
  }
}
</style>
