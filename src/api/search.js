// 搜索相关API

import { request } from './axios'
const API = '/netease-api'

// 热门搜索数据
export const getSearchHot = () => request.get(API + '/search/hot')

// 搜索框实时搜索数据
export const getSearchSuggest = (keywords) => request.get(API + '/search/suggest', { params: { keywords } })
