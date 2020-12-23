<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn">
        <div class="progress-btn" :class="{show: alwaysShowBtn}"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { prefixStyle, toCurrentRem } from '@/utils'

const transform = prefixStyle('transform')

export default {
  name: 'ProgressBar',
  props: {
    percent: {
      type: Number,
      default: 0
    },
    alwaysShowBtn: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      touch: {}
    }
  },
  mounted () {
    if (this.percent > 0) {
      this.setProgressOffset(this.percent)
    }
  },
  methods: {
    // 点击进度条调整进度调进度
    progressClick (e) {
      if (!this.disabled) {
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = Math.max(
          0,
          Math.min(e.pageX - rect.left, this.$refs.progressBar.clientWidth)
        )
        this._offset(offsetWidth)
        // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
        // this._offset(e.offsetX)
        this._triggerPercent()
      }
    },
    // 根据百分比设置进度条
    setProgressOffset (percent) {
      if (percent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth // 获取进度条总长
        const offsetWidth = percent * barWidth // 计算
        this._offset(offsetWidth)
      }
    },
    _offset (offsetWidth) {
      const offsetRem = toCurrentRem(offsetWidth) // 根据长度转化为rem
      this.$refs.progress.style.width = `${offsetRem}`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetRem},0,0)`
    },
    // 根据偏移量调整音量和图标
    _triggerPercent () {
      this.$emit('percentChange', this._getPercent())
    },
    //
    _getPercent () {
      const barWidth = this.$refs.progressBar.clientWidth
      return this.$refs.progress.clientWidth / barWidth
    }
  },
  // watch无法检测第一次percent的赋值
  watch: {
    percent (newPercent) {
      this.setProgressOffset(newPercent)
    }
  }
}
</script>

<style scoped lang="scss">
.progress-bar {
  height: 30px;
  cursor: pointer;

  .bar-inner {
    position: relative;
    top: 14px;
    height: 2px;
    background: var(--progress-bgcolor);

    .progress {
      position: absolute;
      height: 100%;
      background: $theme-color;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        display: none;
        position: relative;
        top: 8px;
        left: 9px;
        box-sizing: border-box;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: $theme-color;

        &.show {
          display: block;
        }
      }
    }
  }
}
</style>
