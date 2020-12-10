// 最新音乐相关API

import { request, requestWithoutLoading } from './axios'
const API = '/netease-api'

// 最新音乐首页列表
export const getTopSongs = (type) => request.get(API + `/top/song?type=${type}`)

// 相似音乐
export const getSimiSongs = (id, option) =>
  requestWithoutLoading.get(API + `/simi/song?id=${id}`, option)
