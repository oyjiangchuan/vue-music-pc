import { requestWithoutLoading } from './axios'
const API = '/netease-api'

export const getUserDetail = (uid) => requestWithoutLoading.get(API + '/user/detail', { params: { uid } })

const PLAYLIST_LIMIT = 1000
export const getUserPlaylist = (uid) => requestWithoutLoading.get(API + '/user/playlist', { params: { uid, limit: PLAYLIST_LIMIT } })
