import { request } from '@/utils/request'

export const getAllSongsFromPlaylist = params => request({
    url: '/playlist/track/all',
    params
})