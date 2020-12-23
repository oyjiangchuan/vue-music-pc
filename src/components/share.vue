<template>
  <!-- 歌曲分享组件 -->
  <!-- :data-clipboard-text 是配合Clipboard插件使用的属性 -->
  <Icon
    :data-clipboard-text="shareUrl"
    :size="20"
    @click="onSharePromptClick"
    class="mode-item"
    ref="shareIcon"
    slot="reference"
    type="share"
  />
</template>

<script type="text/ecmascript-6">
import Clipboard from 'clipboard'
import { confirm } from '@/base/confirm'
export default {
  props: ['shareUrl'],
  mounted () {
    this.initShareIcon()
  },
  methods: {
    initShareIcon () {
      /* eslint-disable no-new */
      // 注释来绕开语法检查对注释下的语句的检查, 只对注释下的一行代码有效
      new Clipboard(this.$refs.shareIcon.$el)
    },
    onSharePromptClick () {
      confirm('分享链接已经复制到剪贴板，快去和小伙伴一起听歌吧！')
    }
  }
}
</script>
