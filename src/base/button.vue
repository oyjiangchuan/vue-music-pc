<template>
  <div @click="onClick" class="n-button">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'NButton',
  props: {
    type: {
      type: String,
      default: 'common'
    }
  },
  methods: {
    onClick (e) {
      this.$emit('click', e) // 好像无用
    }
  }
}
</script>

<style lang="scss" scoped>
.n-button {
  padding: 5px 16px;
  border: 1px solid var(--button-border-color);
  border-radius: 2px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: var(--button-hover-bgcolor);
  }
}
</style>
