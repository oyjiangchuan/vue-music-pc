import { request } from './axios'
// 获取轮播图数据
export const getBanner = () => request.get('/banner?type=0')
// 获取推荐歌单数据
export const getRecommendList = (params) => request.get('/personalized', { params })
