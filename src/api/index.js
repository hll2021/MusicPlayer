//统一出口文件
import { recommendMusic, newSong, playlistViews } from "@/api/Home"
import {
    searchDefault, searchHot, searchResult,
    searchSuggest, songItemPicUrl
} from "@/api/Search"
import { getLyricById } from "@/api/FullScreenPlay"
import { getAllSongsFromPlaylist } from "@/api/Playlist"

export const recommendMusicAPI = recommendMusic;

export const newSongAPI = newSong;

export const searchDefaultAPI = searchDefault;

export const searchHotAPI = searchHot;

export const searchResultAPI = searchResult;

export const songItemPicUrlAPI = songItemPicUrl;

export const playlistViewsAPI = playlistViews;

export const searchSuggestAPI = searchSuggest;

export const getLyricByIdAPI = getLyricById;

export const getAllSongsFromPlaylistAPI = getAllSongsFromPlaylist;
