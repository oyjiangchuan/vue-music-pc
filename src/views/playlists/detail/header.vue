<template>
  <div class="header-wrap">
    <div class="img-wrap">
      <img :src="$utils.genImgUrl(playlist.coverImgUrl, 400)" />
    </div>
    <div class="content-wrap">
      <div class="content-title">
        <p class="title">{{ playlist.name }}</p>
      </div>
      <div class="creator-wrap">
        <img :src="playlist.creator.avatarUrl" class="avatar" />
        <p class="creator">{{ playlist.creator.nickname }}</p>
        <p class="create-time">
          {{ $utils.formatDate(playlist.createTime, "yyyy-MM-dd") }} 创建
        </p>
      </div>
      <div class="action-wrap">
        <NButton @click="playAll" class="button">
          <Icon class="icon middle" color="white" type="play-round" />
          <span class="middle">播放全部</span>
        </NButton>
      </div>
      <div class="desc-wrap">
        <p class="desc" v-if="tagsText">
          <span>标签：{{ tagsText }}</span>
        </p>
        <p class="desc" v-if="playlist.description">
          <span class="value">简介：{{ playlist.description }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    playlist: {
      type: Object,
      default: () => []
    }
  },
  methods: {
    playAll () {}
  },
  computed: {
    tagsText () {
      return this.playlist.tags.join('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrap {
  display: flex;
  padding: 36px;

  .img-wrap {
    width: 200px;
    height: 200px;
    margin-right: 24px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .content-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    .content-title {
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      .title {
        font-size: $font-size-lg;
        color: var(--font-color-white);
      }
    }

    .action-wrap {
      margin-bottom: 18px;

      .button {
        background: #f95043;
        background: linear-gradient(to right, #fa5143, #f44d41, #d53b32);
        color: #fbdfdd;
        border: none;

        .icon {
          margin-right: 4px;
        }

        .middle {
          vertical-align: middle;
        }
      }
    }

    .creator-wrap {
      display: flex;
      align-items: center;
      margin-bottom: 18px;

      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 8px;
      }

      .creator {
        margin-right: 8px;
      }

      .create-time {
        font-size: $font-size-sm;
      }
    }

    .desc {
      margin-bottom: 8px;

      .label {
        display: inline-block;
        margin-right: 8px;
      }

      .value {
        @include text-ellipsis-multi(3);
      }
    }
  }
}
</style>
