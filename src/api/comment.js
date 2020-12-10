// 评论相关API
import { requestWithoutLoading } from './axios'
const API = '/netease-api'

// 歌曲评论
export const getSongComment = (paramas) => requestWithoutLoading.get(API + '/comment/music', { paramas })

// 歌单评论
export const getPlaylistComment = (params) => requestWithoutLoading.get(API + '/comment/playlist', { params })

// 热门评论
export const getHotComment = (params) => requestWithoutLoading.get(API + '/comment/hot', { params })

// mv评论
export const getMvComment = (params) => requestWithoutLoading.get(API + '/comment/mv', { params })
