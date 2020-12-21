// 底部播放器组件
<template>
  <div class="mini-player">
    <!-- 歌曲内容 -->
    <div class="song">
      <template v-if="!hasCurrentSong">
        <div class="img-wrap" @click="togglePlayerShow">
          <div class="mask"></div>
          <img v-lazy="$utils.genImgUrl(currentSong.img, 80)" class="blur" />
          <div class="player-control">
            <Icon :size="24" :type="playControlIcon" color="white" />
          </div>
        </div>
        <div class="content">
          <div class="top">
            <p class="name">歌曲名称</p>
            <p class="split">-</p>
            <p class="artists">作者名字</p>
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
    <!-- 进度条 -->
    <div class="progress-bar-wrap"></div>
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
import { VOLUME_KEY, playModeMap, isDef } from '@/utils'
import icon from '../base/icon.vue'
const DEFAULT_VOLUME = 0.75

export default {
  components: { icon },
  data () {
    return {
      volume: Storage.get(VOLUME_KEY, DEFAULT_VOLUME)
    }
  },
  methods: {
    // 打开收起播放页面
    togglePlayerShow () {
      this.setPlayerShow(!this.isPlayerShow)
    },
    // 切换播放暂停
    togglePlaying () {
      // if (!this.currentSong.id) {
      //   return
      // }
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
    onVolumeChange (percent) {
      // this.audio.volume = percent
      Storage.set(VOLUME_KEY, percent)
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
    ...mapMutations([
      // 'setCurrentTime',
      'setPlayingState',
      'setPlayMode',
      'setPlaylistShow',
      'setPlayerShow'
    ])
  },
  computed: {
    hasCurrentSong () {
      return isDef(this.currentSong.id)
    },
    playIcon () {
      return this.playing ? 'pause' : 'play'
    },
    playControlIcon () {
      return this.isPlayerShow ? 'shrink' : 'open'
    },
    currentMode () {
      return playModeMap[this.playMode]
    },
    modeIcon () {
      return this.currentMode.icon
    },
    playModeText () {
      return this.currentMode.name
    },
    ...mapState([
      'currentSong',
      'currentTime',
      'playing',
      'playMode',
      'isPlaylistShow',
      'isPlaylistPromptShow',
      'isPlayerShow'
    ])
  }
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
    top: 14px;
  }
}
</style>
