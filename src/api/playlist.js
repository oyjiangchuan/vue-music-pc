// 推荐歌单相关API
import { request, requestWithoutLoading } from './axios'
const API = '/netease-api'

// 获取歌单列表
export const getPlaylists = (params) => request.get(API + '/top/playlist', { params })

// 获取头部精品歌单信息
export const getTopPlaylists = (params) => request.get(API + '/top/playlist/highquality', { params })

// 获取相似歌单
export const getSimiPlaylists = (id, option) => requestWithoutLoading.get(`${API}/simi/playlist?id=${id}`, option)

// 获取歌单详情页数据
export const getListDetail = (params) => request.get(API + '/playlist/detail', { params })

// 获取音乐详情
export const getSongDetail = (ids) => request.get(`${API}/song/detail?ids=${ids}`)
