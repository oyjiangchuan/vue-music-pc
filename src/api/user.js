import { requestWithoutLoading } from './axios'
const API = '/netease-api'

// 根据uid获取用户信息
export const getUserDetail = (uid) => requestWithoutLoading.get(API + '/user/detail', { params: { uid } })

// 根据uid获取
const PLAYLIST_LIMIT = 1000
export const getUserPlaylist = (uid) => requestWithoutLoading.get(API + '/user/playlist', { params: { uid, limit: PLAYLIST_LIMIT } })
