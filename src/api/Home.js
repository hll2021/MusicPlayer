//封装Home页面组件中要发起的请求

import { request } from '@/utils/request'

export const recommendMusic = params => request({
    url: '/personalized',
    params
});

export const newSong = params => request({
    url: '/personalized/newsong',
    params
});

export const playlistViews = params => request({
    url: '/playlist/detail/dynamic',
    params
});