// 最新Mv相关API

import { request } from './axios'
const API = '/netease-api'

// 根据id获取Mv详情
export const getMvDetail = (id) => request.get(API + `/mv/detail?mvid=${id}`)

// 获取Mv的url地址
export const getMvUrl = (id) => request.get(API + `/mv/url?id=${id}`)

// 获取相似的Mv
export const getSimiMv = (id) => request.get(API + `/simi/mv?mvid=${id}`)

// 获取所有Mv列表信息
export const getAllMvs = (params) => request.get(API + '/mv/all', { params })
