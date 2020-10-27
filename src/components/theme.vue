<template>
  <div class="theme">
    <el-popover
      placement="top"
      v-model="visible"
      width="230"
    >
      <div class="themes">
        <div
          :key="index"
          @click="changeTheme(themeKey)"
          class="theme-item"
          v-for="(themeValue, themeKey, index) in themeMap"
        >
          <div
            :style="themeValue.style"
            class="theme-icon"
          ></div>
          <p>{{themeValue.title}}</p>
        </div>
      </div>
      <Icon
        :backdrop="true"
        slot="reference"
        type="skin"
      />
    </el-popover>
  </div>
</template>

<script type="text/ecmascript-6">
import storage from 'good-storage'
import variables from '@/style/themes/variables'
import variablesWhite from '@/style/themes/variables-white'
import variablesRed from '@/style/themes/variables-red'

const THEME_KEY = '__theme__'
const themes = {
  white: 'white',
  dark: 'dark',
  red: 'red'
}
export default {
  data () {
    return {
      visible: false
    }
  },
  created () {
    this.themeMap = {
      [themes.dark]: {
        title: '深色',
        file: variables,
        style: {
          backgroundColor: '#202020'
        }
      },
      [themes.white]: {
        title: '浅色',
        file: variablesWhite,
        style: {
          backgroundColor: '#F6F6F6',
          border: '1px solid #EBEAEA'
        }
      },
      [themes.red]: {
        title: '红色',
        file: variablesRed,
        style: {
          backgroundColor: '#D33A31'
        }
      }
    }
    // 默认浅色
    this.changeTheme(storage.get(THEME_KEY, themes.white))
  },
  methods: {
    changeTheme (themeKey) {
      storage.set(THEME_KEY, themeKey)
      const theme = this.themeMap[themeKey].file
      Object.keys(theme).forEach(key => {
        const value = theme[key]
        // 一键换肤功能核心代码, setProperty()方法用于设置一个新的CSS属性, 然后在CSS中就可以使用例如: var(--font-color)
        // 这种方式访问, 是原生CSS3中就支持的用法。var() 函数用于插入自定义的属性值，如果一个属性值在多处被使用，该方法就很有用
        // 这个和CSS预处理器less或者sass中定义的变量有些许区别
        document.documentElement.style.setProperty(key, value)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.themes {
  @include flex-center();

  .theme-item {
    @include flex-center();
    flex-direction: column;
    margin: 0 8px;
    cursor: pointer;

    .theme-icon {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      margin-bottom: 4px;
    }
  }
}
</style>
