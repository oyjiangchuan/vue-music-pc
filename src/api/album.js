// 专辑相关API
import { request } from './axios'
const API = '/netease-api'

export const getAlbum = (id) => request.get(API + `/album?id=${id}`)
