import { request } from './axios'

// 获取歌单列表
export const getPlaylists = (params) => request.get('/top/playlist', { params })
// 获取头部精品歌单信息
export const getTopPlaylists = (params) => request.get('/top/playlist/highquality', { params })
