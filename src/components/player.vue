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
          <div class="right">
            <div class="name-wrap">
              <p class="name">{{currentSong.name}}</p>
              <span
                @click="onGoMv"
                class="mv-tag"
                v-if="currentSong.mvId"
              >MV</span>
            </div>
            <div class="desc">
              <div class="desc-item">
                <span class="label">歌手：</span>
                <div class="value">{{currentSong.artistsText}}</div>
              </div>
            </div>
            <empty v-if="nolyric">还没有歌词哦~</empty>
            <Scroller
              v-else
              :data="lyric"
              :options="{disableTouch: true}"
              @init="onInitScroller"
              class="lyric-wrap"
              ref="scroller"
            >
              <div>
                <div
                  :class="getActiveCls(index)"
                  class="lyric-item"
                  ref="lyric"
                  v-for="(l,index) in lyricWithTranslation"
                  :key="index"
                >
                  <p
                    class="lyric-text"
                    v-for="(content, contentIndex) in l.contents"
                    :key="contentIndex"
                  >{{content}}</p>
                </div>
              </div>
            </Scroller>
          </div>
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
          <div class="right" v-if="simiPlaylists.concat(simiSongs).length">
           <Loading v-if="simiLoading" :loading="simiLoading"/>
           <div v-else>
             <div class="simi-playlists" v-if="simiPlaylists.length">
               <p class="title">包含这首哥的歌单</p>
               <div
                  class="simi-item"
                  v-for="simiPlaylist in simiPlaylists"
                  :key="simiPlaylist.id"
                >
                  <Card
                    :img="simiPlaylist.coverImgUrl"
                    :name="simiPlaylist.name"
                    @click="onClickPlaylist(simiPlaylist.id)"
                  >
                    <template v-slot:desc>
                      <div class="desc">
                        <Icon
                          :size="12"
                          color="shallow"
                          type="play"
                        />
                        <p class="count">{{ $utils.formatNumber(simiPlaylist.playCount) }}</p>
                      </div>
                    </template>
                  </Card>
                </div>
             </div>
             <div class="simi-songs" v-if="simiSongs.length">
               <p class="title">相似歌曲</p>
               <div
                  class="simi-item"
                  v-for="simiSong in simiSongs"
                  :key="simiSong.id"
                >
                  <Card
                    :desc="simiSong.artistsText"
                    :img="simiSong.img"
                    :name="simiSong.name"
                    @click="onClickSong(simiSong)"
                  >
                    <template v-slot:img-mask>
                      <PlayIcon class="play-icon" />
                    </template>
                  </Card>
                </div>
             </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import lyricParser from '@/utils/lrcparse'
import { getLyric, getSimiSongs, getSimiPlaylists } from '@/api'
import { debounce, isDef, createSong, goMvWithCheck } from '@/utils'
import { mapState, mapMutations, mapActions, mapGetters } from '@/store/helper/music'
import Comments from '@/components/comments'
const WHEEL_TYPE = 'wheel'
const SCROLL_TYPE = 'scroll'
// 恢复自动滚动的定时器时间
const AUTO_SCROLL_RECOVER_TIME = 1000

export default {
  created () {
    this.lyricScrolling = {
      [WHEEL_TYPE]: false,
      [SCROLL_TYPE]: false
    }
    this.lyricTimer = {
      [WHEEL_TYPE]: null,
      [SCROLL_TYPE]: null
    }
  },
  data () {
    return {
      simiLoading: false,
      simiPlaylists: [], // 相似歌单列表
      simiSongs: [], // 相似歌曲列表
      nolyric: false, // 是否存在歌词
      lyric: [], // 歌词
      tlyric: [] // 可能是其他语言的歌词
    }
  },
  methods: {
    // 更新歌曲信息
    async updateSong () {
      this.updateLyric()
      this.updateSimi()
    },
    // 更新歌词
    async updateLyric () {
      const result = await getLyric(this.currentSong.id)
      this.nolyric = !isDef(result.lrc) || !result.lrc.lyric
      if (!this.nolyric) { // 歌词存在
        const { lyric, tlyric } = lyricParser(result)
        this.lyric = lyric
        this.tlyric = tlyric
      }
    },
    // 更新相似歌单/歌曲列表
    async updateSimi () {
      this.simiLoading = true
      const [simiPlaylists, simiSongs] = await Promise.all([
        getSimiPlaylists(this.currentSong.id),
        getSimiSongs(this.currentSong.id)
      ]).finally(() => {
        this.simiLoading = false
      })
      this.simiPlaylists = simiPlaylists.playlists
      this.simiSongs = simiSongs.songs.map((song) => {
        const {
          id,
          name,
          artists,
          mvid,
          album: { picUrl },
          duration
        } = song
        return createSong({
          id,
          name,
          artists,
          duration,
          img: picUrl,
          mvId: mvid
        })
      })
    },
    // 切换player组件显示隐藏
    getPlayerShowCls () {
      return this.isPlayerShow ? 'show' : 'hide'
    },
    // 切换播放暂停
    changePlaying () {
      this.setPlayingState(!this.playing)
    },
    // 点击歌单操作
    onClickPlaylist (id) {
      // 点击的歌单和当前打开的单页是同一个 直接关闭player
      if (id === Number(this.$route.params.id)) {
        this.setPlayerShow(false)
      } else {
        this.$router.push(`/playlist/${id}`)
      }
    },
    // 点击相似歌曲操作
    onClickSong (song) {
      this.startSong(song)
      this.addToPlaylist(song)
    },
    // 前往mv页面
    onGoMv () {
      this.setPlayerShow(false)
      goMvWithCheck(this.currentSong.mvId)
    },
    // better-scroll init 的回调
    onInitScroller (scroller) {
      const onScrollStart = type => {
        this.clearTimer(type)
        this.lyricScrolling[type] = true
      }
      const onScrollEnd = type => {
        // 滚动结束后两秒 歌词开始自动滚动
        this.clearTimer(type)
        this.lyricTimer[type] = setTimeout(() => {
          this.lyricScrolling[type] = false
        }, AUTO_SCROLL_RECOVER_TIME)
      }

      scroller.on('scrollStart', onScrollStart.bind(null, SCROLL_TYPE))
      scroller.on('mousewheelStart', onScrollStart.bind(null, WHEEL_TYPE))

      scroller.on('scrollEnd', onScrollEnd.bind(null, SCROLL_TYPE))
      scroller.on('mousewheelEnd', onScrollEnd.bind(null, WHEEL_TYPE))
    },
    // 清除定时器
    clearTimer (type) {
      this.lyricTimer[type] && clearTimeout(this.lyricTimer[type])
    },
    // 根据时间判断当前的歌词
    getActiveCls (index) {
      return this.activeLyricIndex === index ? 'active' : ''
    },
    // 动态滚动歌词
    scrollToActiveLyric () {
      if (this.activeLyricIndex !== -1) {
        const { scroller, lyric } = this.$refs
        if (lyric && lyric[this.activeLyricIndex]) {
          scroller.getScroller().scrollToElement(lyric[this.activeLyricIndex], 200, 0, true)
        }
      }
    },
    // 添加监听resize事件：浏览器窗口被调整到一个新的高度或宽度时，就会触发resize事件
    addResizeListener () {
      window.addEventListener('resize', this.resizeScroller)
    },
    // 移除监听resize事件
    removeResizeListener () {
      window.removeEventListener('resize', this.resizeScroller)
    },
    // 刷新歌词
    resizeScroller () {
      debounce(() => {
        this.$refs.scroller.getScroller().refresh()
      }, 500)
    },
    ...mapMutations(['setPlayingState', 'setPlayerShow']),
    ...mapActions(['startSong', 'addToPlaylist'])
  },
  computed: {
    // 根据currentTime判断当前的歌词行数 根据当前的时间 是否--大于当前time--小于下一行的time
    activeLyricIndex () {
      return this.lyricWithTranslation
        ? this.lyricWithTranslation.findIndex((l, index) => {
          const nextLyric = this.lyricWithTranslation[index + 1]
          return (
            this.currentTime >= l.time &&
            (nextLyric ? this.currentTime < nextLyric.time : true)
          )
        })
        : -1
    },
    // 组装歌词/lyric和tlyric组装 但是一般tlyric为空
    lyricWithTranslation () {
      let ret = []
      // 歌词空内容的去除
      const lyricFiltered = this.lyric.filter(({ content }) => Boolean(content))
      // content统一转换数组形式
      if (lyricFiltered.length) {
        lyricFiltered.forEach(l => {
          const { time, content } = l
          const lyricItem = { time, content, contents: [content] }
          // 根据time组装contents/这里可能会有两种歌词/比如中英文的/所以组装
          const sameTimeTLyric = this.tlyric.find(
            ({ time: tLyricTime }) => tLyricTime === time
          )
          if (sameTimeTLyric) {
            const { content: tLyricContent } = sameTimeTLyric
            if (content) {
              lyricItem.contents.push(tLyricContent)
            }
          }
          ret.push(lyricItem)
        })
      } else {
        ret = lyricFiltered.map(({ time, content }) => ({
          time,
          content,
          contents: [content]
        }))
      }
      return ret
    },
    ...mapState(['currentSong', 'currentTime', 'playing', 'isPlayerShow']),
    ...mapGetters(['hasCurrentSong'])
  },
  watch: {
    // 监听isPlayerShow 请求相似歌曲/歌单请求
    isPlayerShow (show) {
      if (show) {
        // 歌词短期内不会变化 所以只拉取相似信息
        this.updateSimi()
        this.addResizeListener()
        this.$nextTick(() => {
          this.scrollToActiveLyric()
        })
      } else {
        this.removeResizeListener()
      }
    },
    // 监听currentSong 展示player组件 更新歌曲信息
    currentSong (newSong, oldSong) {
      if (!newSong.id) {
        this.setPlayerShow(false)
        return
      }
      if (newSong.id === oldSong.id) {
        return
      }
      // 如果歌曲详情显示状态切歌 需要拉取歌曲相关信息
      if (this.isPlayerShow) {
        this.updateSong()
      } else {
        // 否则只是更新歌词
        this.updateLyric()
      }
    },
    // 监听activeLyricIndex改变 动态滚动歌词
    activeLyricIndex (newIndex, oldIndex) {
      if (
        newIndex !== oldIndex &&
        !this.lyricScrolling[WHEEL_TYPE] &&
        !this.lyricScrolling[SCROLL_TYPE]
      ) {
        this.scrollToActiveLyric()
      }
    },
    $route () {
      this.setPlayerShow(false)
    }
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

      .right {
        flex: 1;
        padding-top: 45px;

        .name-wrap {
          display: flex;
          align-items: center;
          margin-bottom: 16px;

          .name {
            font-size: $font-size-title-lg;
            color: var(--font-color-white);
          }

          .mv-tag {
            display: inline-block;
            margin-left: 8px;
            padding: 2px;
            border: 1px solid currentColor;  // currentColor代表？
            border-radius: 2px;
            color: $theme-color;
            cursor: pointer;
          }
        }

        .desc {
          display: flex;
          font-size: $font-size-sm;
          margin-bottom: 30px;

          .desc-item {
            display: flex;
            margin-right: 32px;

            .label {
              display: inline-block;
              margin-right: 4px;
            }

            .value {
              color: $blue;
            }
          }
        }

        .lyric-wrap {
          width: 380px;
          height: 350px;
          // 蒙尘效果
          mask-image: linear-gradient(
            180deg,
            hsla(0, 0%, 100%, 0) 0,
            hsla(0, 0%, 100%, 0.6) 15%,
            #fff 25%,
            #fff 75%,
            hsla(0, 0%, 100%, 0.6) 85%,
            hsla(0, 0%, 100%, 0)
          );

          .lyric-item {
            margin-bottom: 16px;
            font-size: $font-size-sm;

            &.active {
              font-size: $font-size;
              color: var(--font-color-white);
              font-weight: $font-weight-bold;
            }

            .lyric-text {
              margin-bottom: 8px;
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

        .simi-playlists {
          margin-bottom: 36px;
        }

        .simi-item {
          margin-bottom: 6px;
        }

        .simi-songs {
          .play-icon {
            @include abs-center;
          }
        }

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
