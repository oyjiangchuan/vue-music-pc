// mv相关API补充
import { request } from './axios'
const API = '/netease-api'

export const getArtists = (id) => request.get(API + `/artists?id=${id}`)
