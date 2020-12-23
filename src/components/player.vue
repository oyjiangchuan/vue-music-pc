<template>
  <transition name="slide">
    <div v-if="hasCurrentSong" class="player" :class="getPlayerShowCls()">
      <div class="content">
        <!-- 歌曲/歌词 -->
        <div class="song">
          <!-- 左侧光盘 -->
          <div class="left">
            <img class="play-bar-support" src="@/assets/image/play-bar-support.png" />
            <img :class="{playing}" class="play-bar" src="@/assets/image/play-bar.png" />
            <!-- :class="{playing}" 是 :class="{playing: playing}" 的简写 -->
            <div class="img-outer-border" ref="disc" @click="changePlaying">
              <div
                :class="{paused: !playing}"
                class="img-outer"
                ref="discRotate"
              >
                <div class="img-wrap">
                  <img v-lazy="$utils.genImgUrl(currentSong.img, 400)" />
                </div>
              </div>
            </div>
          </div>
          <!-- 右侧歌词 -->
          <div class="right"></div>
        </div>
        <!-- 评论/歌单 -->
        <div class="bottom">
          <div class="left">
            <Comments
              v-if="currentSong.id"
              :id="currentSong.id"
              ref="comments"
            />
          </div>
          <div class="right">
            <p class="title">右侧歌单列表</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapState, mapMutations, mapActions, mapGetters } from '@/store/helper/music'
import Comments from '@/components/comments'

export default {
  methods: {
    getPlayerShowCls () {
      return this.isPlayerShow ? 'show' : 'hide'
    },
    // 切换播放暂停
    changePlaying () {
      this.setPlayingState(!this.playing)
    },
    ...mapMutations(['setPlayingState'])
  },
  computed: {
    ...mapState(['currentSong', 'currentTime', 'playing', 'isPlayerShow']),
    ...mapGetters(['hasCurrentSong'])
  },
  components: { Comments }
}
</script>

<style lang="scss" scoped>
// 旋转的动画
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn); // 1turn：一圈
  }
}

// 定义常量
$img-left-padding: 36px;
$img-outer-border-d: 320px;
$img-outer-d: 300px;

.player {
  position: fixed;
  top: $header-height;
  bottom: $mini-player-height;
  left: 0;
  right: 0;
  padding: 0 36px;
  background: var(--player-bgcolor);
  z-index: $song-detail-z-index;
  overflow: hidden;
  overflow-y: auto;
  transition: transform 0.5s;

  &.hide {
    transform: translateY(105%);
  }

  &.show {
    transform: none;
  }

  .content {
    max-width: 870px;
    margin: auto;

    .song {
      display: flex;

      .left {
        position: relative;
        padding: 80px 70px 0 $img-left-padding;
        display: flex;
        justify-content: center;

        $support-d: 30px;
        $support-d-half: $support-d / 2;

        .play-bar-support {
          position: absolute;
          left: $img-left-padding + $img-outer-border-d / 2 - $support-d / 2;
          top: -$support-d-half;
          width: $support-d;
          height: $support-d;
          z-index: 2;
        }

        .play-bar {
          $w: 100px;
          $h: 146px;
          position: absolute;
          top: 0;
          left: $img-left-padding + $img-outer-border-d / 2 - 6px;
          width: $w;
          height: $h;
          z-index: 1;
          transform-origin: 0 0;
          transform: rotate(-30deg);
          transition: all 0.3s;

          &.playing {
            transform: rotate(5deg);
          }
        }

        .img-outer-border {
          cursor: pointer;
          @include round($img-outer-border-d);
          @include flex-center;
          background: var(--song-shallow-grey-bg);

          .img-outer {
            @include round($img-outer-d);
            @include flex-center;
            background: $black;
            background: linear-gradient(-45deg, #333540, #070708, #333540);
            animation: rotate 20s linear infinite;

            &.paused {
              animation-play-state: paused;
            }

            .img-wrap {
              @include img-wrap(200px);

              img {
                border-radius: 50%;
              }
            }
          }
        }
      }
    }

    .bottom {
      display: flex;
      margin-top: 48px;
      margin-bottom: 36px;

      .left {
        flex: 1;
      }

      .right {
        padding-left: 36px;
        width: 28%;
        overflow: hidden;

        .title {
          font-size: $font-size-lg;
          font-weight: $font-weight-bold;
          margin-bottom: 12px;
        }
      }
    }
  }
}
</style>
