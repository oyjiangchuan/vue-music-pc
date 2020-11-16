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
  interval = interval || 0
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
