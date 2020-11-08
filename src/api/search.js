import { request } from './axios'

// 热门搜索数据
export const getSearchHot = () => request.get('search/hot')
// 搜索框实时搜索数据
export const getSearchSuggest = (keywords) => request.get('/search/suggest', { params: { keywords } })
