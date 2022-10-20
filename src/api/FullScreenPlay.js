//封装Play页面要发出的请求
import { request } from "@/utils/request"

export const getLyricById = params => request({
    url: '/lyric',
    params
})