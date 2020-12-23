// 底部播放器组件
<template>
  <div class="mini-player" id="mini-player">
    <!-- 歌曲内容 -->
    <div class="song">
      <template v-if="hasCurrentSong">
        <div class="img-wrap" @click="togglePlayerShow">
          <div class="mask"></div>
          <img v-lazy="$utils.genImgUrl(currentSong.img, 80)" class="blur" />
          <div class="player-control">
            <Icon :size="24" :type="playControlIcon" color="white" />
          </div>
        </div>
        <div class="content">
          <div class="top">
            <p class="name">{{ currentSong.name }}</p>
            <p class="split">-</p>
            <p class="artists">{{ currentSong.artistsText }}</p>
          </div>
          <div class="time">
            <span class="played-time">{{
              $utils.formatTime(currentTime)
            }}</span>
            <span class="split">/</span>
            <span class="total-time">{{
              $utils.formatTime(currentSong.duration / 1000)
            }}</span>
          </div>
        </div>
      </template>
    </div>
    <!-- 控制台 -->
    <div class="control">
      <Icon :size="24" class="icon" @click="prev" type="prev" />
      <div @click="togglePlaying" class="play-icon" slot="reference">
        <Icon :size="24" class="icon" :type="playIcon" />
      </div>
      <Icon :size="24" class="icon" @click="next" type="next" />
    </div>
    <!-- 模式/音量/歌单/分享等功能 -->
    <div class="mode">
      <!-- 分享歌曲 -->
      <Share :shareUrl="shareUrl" class="mode-item" v-show="hasCurrentSong" />

      <!-- 模式 -->
      <el-popover placement="top" trigger="hover" width="160">
        <p>{{ playModeText }}</p>
        <Icon
          :size="20"
          :type="modeIcon"
          @click="onChangePlayMode"
          class="mode-item"
          slot="reference"
        />
      </el-popover>

      <!-- 播放列表 -->
      <el-popover
        :value="isPlaylistPromptShow"
        placement="top"
        trigger="manual"
        width="160"
      >
        <p>已更新歌单</p>
        <Icon
          :size="20"
          @click="togglePlaylistShow"
          class="mode-item"
          slot="reference"
          type="playlist"
        />
      </el-popover>

      <!-- 音量 -->
      <div class="volume-item">
        <Volume :volume="volume" @volumeChange="onVolumeChange" />
      </div>

      <!-- github -->
      <Icon :size="20" @click="goGitHub" class="mode-item" type="github" />
    </div>
    <!-- 歌曲进度条 -->
    <div class="progress-bar-wrap">
      <ProgressBar
        :disabled="!hasCurrentSong"
        :percent="playedPercent"
        @percentChange="onProgressChange"
      />
    </div>
    <audio
      :src="currentSong.url"
      @canplay="ready"
      @ended="end"
      @timeupdate="updateTime"
      ref="audio"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions
} from '@/store/helper/music'
import Storage from 'good-storage'
import Share from '@/components/share'
import { VOLUME_KEY, playModeMap, isDef } from '@/utils'
const DEFAULT_VOLUME = 0.75

export default {
  data () {
    return {
      volume: Storage.get(VOLUME_KEY, DEFAULT_VOLUME),
      songReady: false,
      isPlayErrorPromptShow: false
    }
  },
  mounted () {
    this.audio.volume = this.volume
  },
  methods: {
    // 打开收起播放页面
    togglePlayerShow () {
      this.setPlayerShow(!this.isPlayerShow)
    },
    // 准备播放
    ready () {
      this.songReady = true
    },
    // 播放歌曲
    async play () {
      if (this.songReady) {
        try {
          await this.audio.play()
          if (this.isPlayErrorPromptShow) {
            this.isPlayErrorPromptShow = false
          }
        } catch (error) {
          // 提示用户手动播放
          this.isPlayErrorPromptShow = true
          this.setPlayingState(false)
        }
      }
    },
    // 关闭歌曲播放
    pause () {
      this.audio.pause()
    },
    // 歌曲播放获得时间的回调
    updateTime (e) {
      const time = e.target.currentTime
      this.setCurrentTime(time)
    },
    // 切换播放暂停
    togglePlaying () {
      if (!this.currentSong.id) {
        return
      }
      this.setPlayingState(!this.playing)
    },
    // 播放上一曲
    prev () {
      console.log('播放上一曲')
    },
    // 播放下一曲
    next () {
      console.log('播放下一曲')
    },
    // 播放结束自动播放下一曲
    end () {
      this.next()
    },
    // 点击调整进度回调
    onVolumeChange (percent) {
      // 这里percent可能为undefined 为undefined时设置0
      this.audio.volume = percent || 0
      Storage.set(VOLUME_KEY, percent || 0)
    },
    // 切换播放模式
    onChangePlayMode () {
      const modeKeys = Object.keys(playModeMap)
      const currentModeIndex = modeKeys.findIndex(
        key => playModeMap[key].code === this.playMode
      )
      const nextIndex = (currentModeIndex + 1) % modeKeys.length
      const nextModeKey = modeKeys[nextIndex]
      const nextMode = playModeMap[nextModeKey]
      this.setPlayMode(nextMode.code)
    },
    // 打开收起播放列表
    togglePlaylistShow () {
      this.setPlaylistShow(!this.isPlaylistShow)
    },
    // 打开gitHub
    goGitHub () {
      window.open('https://github.com/Loserchuan/vue-music-pc')
    },
    // 歌曲进度改变
    // 这里的逻辑 点击改变百分比
    // 改变audio的currentTime
    // currentTime改变会触发更新setCurrentTime
    // vuex中的currentTime一改变
    // computed中的进度比playedPercent会重新计算形成闭环
    onProgressChange (percent) {
      this.audio.currentTime = this.currentSong.durationSecond * percent
      this.setPlayingState(true)
    },
    ...mapMutations([
      'setCurrentTime',
      'setPlayingState',
      'setPlayMode',
      'setPlaylistShow',
      'setPlayerShow'
    ]),
    ...mapActions(['startSong'])
  },
  computed: {
    // 当前是否存在单曲
    hasCurrentSong () {
      return isDef(this.currentSong.id)
    },
    // 播放图标
    playIcon () {
      return this.playing ? 'pause' : 'play'
    },
    // 控制播放详情页面图标
    playControlIcon () {
      return this.isPlayerShow ? 'shrink' : 'open'
    },
    // 当前播放模式
    currentMode () {
      return playModeMap[this.playMode]
    },
    // 模式对应的图标
    modeIcon () {
      return this.currentMode.icon
    },
    // 模式对应的文字
    playModeText () {
      return this.currentMode.name
    },
    // 播放器实例
    audio () {
      return this.$refs.audio
    },
    // 获取当前的歌曲分享地址
    shareUrl () {
      // 因为是hash模式所以需要加/#/
      return `${window.location.origin}/#/?shareMusicId=${this.currentSong.id}`
    },
    // 播放的进度比
    playedPercent () {
      const { durationSecond } = this.currentSong
      return Math.min(this.currentTime / durationSecond, 1) || 0
    },
    ...mapState([
      'currentSong',
      'currentTime',
      'playing',
      'playMode',
      'isPlaylistShow',
      'isPlaylistPromptShow',
      'isPlayerShow'
    ]),
    ...mapGetters(['prevSong', 'nextSong'])
  },
  watch: {
    currentSong (newSong, oldSong) {
      // 清空了歌曲
      if (!newSong.id) {
        this.audio.pause()
        this.audio.currentTime = 0
        return
      }
      // 单曲循环
      if (oldSong && newSong.id === oldSong.id) {
        this.setCurrentTime(0)
        this.audio.currentTime = 0
        this.play()
        return
      }
      this.songReady = false
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.play()
      }, 1000)
    },
    playing (newPlaying) {
      this.$nextTick(() => {
        newPlaying ? this.play() : this.pause()
      })
    }
  },
  components: { Share }
}
</script>

<style lang="scss" scoped>
.mini-player {
  position: relative;
  position: fixed;
  z-index: $mini-player-z-index;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  height: $mini-player-height;
  padding: 8px 16px;
  padding-right: 24px;
  background: var(--body-bgcolor);

  .song {
    flex: 4;
    overflow: hidden;
    display: flex;

    .img-wrap {
      position: relative;
      margin-right: 8px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      @include img-wrap(40px);

      img {
        &.blur {
          filter: blur(2px);
        }
      }

      .player-control {
        @include abs-center;
      }

      .mask {
        @include abs-stretch;
        background: rgba(0, 0, 0, 0.2);
      }
    }

    .content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .top {
        display: flex;
        align-items: flex-end;
        white-space: nowrap;

        .name {
          color: var(--font-color-white);
          @include text-ellipsis;
        }

        .split {
          font-size: $font-size-xs;
          margin: 0 4px;
        }

        .artists {
          font-size: $font-size-xs;
          @include text-ellipsis;
        }
      }

      .time {
        font-size: $font-size-xs;
        color: var(--font-color-grey);

        .split {
          margin: 0 4px;
        }
      }
    }
  }

  .control {
    position: absolute;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    @include flex-center();

    .play-icon {
      @include flex-center();
      position: relative;
      width: 45px;
      height: 45px;
      margin: 0 16px;
      border-radius: 50%;
      background: $theme-color;
      cursor: pointer;

      i {
        color: #fff;
      }
    }

    .icon {
      color: $theme-color;
    }
  }

  .mode {
    display: flex;
    align-items: center; // 垂直方向
    justify-content: flex-end; // 水平方向
    flex: 6;

    .mode-item {
      display: block;
      margin-right: 16px;
      width: 22px;
    }

    .volume-item {
      margin-right: 22px;
    }
  }

  .progress-bar-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: -14px;
  }
}
</style>
