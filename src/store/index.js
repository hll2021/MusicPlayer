const { createStore } = Vuex;
import { songItemPicUrlAPI } from '@/api'
export default createStore({
  state: {
    // 播放状态
    isPlaying: false,
    // 当前播放歌曲的id
    //为0时表示当前没有正在播放的歌曲
    currentId: localStorage.getItem('curSongId') || 0,
    // 当前播放歌曲信息
    currentSongInfo: JSON.parse(localStorage.getItem('curSongInfo')) || {},
    // 全屏播放器/迷你播放器
    fullScreen: false
  },
  getters: {
    //获取当前播放歌曲url
    songUrl(state) {
      return state.currentId ?
        `https://music.163.com/song/media/outer/url?id=${state.currentId}.mp3` : ''
    }
  },
  //变更状态
  mutations: {
    // 设置播放状态
    setPlayingState(state, isPlaying) {
      state.isPlaying = isPlaying;
    },
    // 设置全屏状态
    setFullScreen(state, fullScreen) {
      state.fullScreen = fullScreen;
    },
    // 设置当前播放歌曲的id
    setCurrentId(state, currentId) {
      state.currentId = currentId;
      localStorage.setItem('curSongId', currentId);
    },
    //设置当前播放歌曲的信息
    setCurrentSongInfo(state, currentSongInfo) {
      state.currentSongInfo = currentSongInfo;
      localStorage.setItem('curSongInfo', JSON.stringify(currentSongInfo));
    }
  },
  actions: {
    //获取歌曲封面
    async getPicUrl({ commit }, SongId) {
      const res = await songItemPicUrlAPI({
        ids: SongId,
        realIP: '116.25.146.177'
      });
      commit('setCurrentSongInfo', {
        picUrl: `${res.data.songs[0].al.picUrl}?imageView&thumbnail=360y360&quality=75&tostatic=0`,
        name: res.data.songs[0].name,
        author: res.data.songs[0].ar[0].name
      })
    }
  }
})
