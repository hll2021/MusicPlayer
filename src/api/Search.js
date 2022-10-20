//封装Search页面组件要发起的请求
import { request } from '@/utils/request'

export const searchDefault = () => request({
    url: '/search/default'
})

export const searchHot = () => request({
    url: '/search/hot'
})

export const searchResult = (params) => request({
    url: '/search',
    params
})

export const searchSuggest = (params) => request({
    url: '/search/suggest',
    params
})

export const songItemPicUrl = (params) => request({
    url: '/song/detail',
    params
})