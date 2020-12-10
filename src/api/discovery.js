// 发现音乐相关API
import { request } from './axios'
const API = '/netease-api'

// 获取轮播图数据
export const getBanner = () => request.get(API + '/banner?type=0')

// 获取推荐歌单数据
export const getRecommendList = (params) => request.get(API + '/personalized', { params })

// 获取最新音乐数据
export const getNewSongs = () => request.get(API + '/personalized/newsong')

// 获取推荐mv数据
export const getPersonalizedMv = () => request.get(API + '/personalized/mv')
