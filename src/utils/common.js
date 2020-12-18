import { Notification } from 'element-ui'

export { throttle, debounce } from 'lodash-es'
// 拼接imgurl请求地址
export const genImgUrl = (url, w, h) => {
  if (!h) {
    h = w
  }
  url += `?param=${w}y${h}`
  return url
}

export const pad = (num, n = 2) => {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}
// 判断是否为null和undefined
export const isDef = (v) => {
  return v !== undefined && v !== null
}
// 处理大数
export const formatNumber = (number) => {
  number = Number(number) || 0
  return number > 100000 ? `${Math.round(number / 10000)}万` : number
}
// 转化分秒
export const formatTime = (interval) => {
  interval = interval | 0
  const minute = pad((interval / 60) | 0)
  const second = pad(interval % 60)
  return `${minute}:${second}`
}
// 处理请求偏移量
export const getPageOffset = (page, limit) => {
  return (page - 1) * limit
}
// 锚链接置顶
export const scrollInto = (dom) => {
  dom.scrollIntoView({ behavior: 'smooth' }) // Element.scrollIntoView()方法
}
// 时间戳转年月日
export const formatDate = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  date = date instanceof Date ? date : new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

export const shallowEqual = (a, b, compareKey) => {
  if (a.length !== b.length) {
    return false
  }
  for (let i = 0; i < a.length; i++) {
    let compareA = a[i]
    let compareB = b[i]
    if (compareKey) {
      compareA = compareA[compareKey]
      compareB = compareB[compareKey]
    }
    if (!Object.is(a[i], b[i])) {
      return false
    }
  }
  return true
}
// 提醒框封装
export const notify = (message, type) => {
  const params = {
    message,
    duration: 1500
  }
  const fn = type ? Notification[type] : Notification
  return fn(params)
}
['success', 'warning', 'info', 'error'].forEach(key => {
  notify[key] = (message) => {
    return notify(message, key)
  }
})
// 判断是不是最后一条数据
export const isLast = (index, arr) => {
  return index === arr.length - 1
}
// 点击全屏方法
export const requestFullScreen = (element) => {
  const docElm = element
  if (docElm.requestFullScreen) {
    docElm.requestFullScreen()
  } else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen()
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen()
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen()
  }
}
// 点击恢复正常大小方法
export const exitFullscreen = () => {
  const de = window.parent.document
  if (de.exitFullscreen) {
    de.exitFullscreen()
  } else if (de.mozCancelFullScreen) {
    de.mozCancelFullScreen()
  } else if (de.webkitCancelFullScreen) {
    de.webkitCancelFullScreen()
  } else if (de.msExitFullscreen) {
    de.msExitFullscreen()
  }
}

// 判断是否全屏
export const isFullscreen = () => {
  return document.fullScreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen
}
