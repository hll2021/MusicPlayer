<template>
  <div>
    <!-- 推荐歌单 -->
    <p class="title">
      <van-icon color="#8648D3" name="fire-o" /> 大家都在听
    </p>
    <van-loading v-show="this.recommendList.length===0" 
      class="van-loading" type="spinner" vertical>加载中...
    </van-loading>
    <van-col class="van-col">
      <van-row class="recommend-list" v-for="obj in recommendList" :key="obj.id" 
        @click="toPlaylist(obj.id, obj.picUrl, obj.name)">
        <van-image width="100%" height="3rem" fit="cover" :src="obj.picUrl" lazy-load/>
        <!-- 歌单播放量 -->
        <keep-alive>
          <PlaylistViews :id="obj.id"></PlaylistViews>
        </keep-alive>
        <p class="van-multi-ellipsis--l2 song-name">{{ obj.name }}</p>
      </van-row>
    </van-col>
    
    <!-- 最新歌曲 -->
    <p class="title">
      <van-icon color="#8648D3" name="smile-o" size="0.48rem" /> 最新歌曲
    </p>
    <van-loading v-show="this.newSongList.length===0" 
      class="van-loading" type="spinner" vertical>加载中...
    </van-loading>
    <SongItem v-for="item in newSongList" :key="item.id" 
      :name="item.name" :author="item.song.artists[0].name" 
      :id="item.id" :pic-url="item.picUrl">
    </SongItem>
  </div>
</template>

<script>
import { recommendMusicAPI, newSongAPI } from '@/api'
import PlaylistViews from '@/components/PlaylistViews.vue';
import SongItem from '@/components/SongItem.vue';

export default {
  data() {
    return {
      recommendList: [],
      newSongList: [],
      isPlaying: false,
    }
  },
  name: 'home-view',
  components: {
    PlaylistViews,
    SongItem
  },
  created() {
    this.getRecommendMusic();
    this.getNewSong();
  },
  methods: {
    async getRecommendMusic() {
      const recommendMusicRes = await recommendMusicAPI({ limit: 12, realIP: '116.25.146.177'});
      this.recommendList = recommendMusicRes.data.result;
    },
    async getNewSong() {
      const newSongRes = await newSongAPI({ limit: 15, realIP: '116.25.146.177'});
      //过滤付费、vip和无版权歌曲
      this.newSongList = newSongRes.data.result.filter(item => {
        return item.song.fee === 8 || item.song.fee === 0 && !item.song.noCopyrightRcmd;
      });
    },
    toPlaylist(id, picUrl, title) {
      this.$router.push({
        path: '/playlist',
        query: {
          id,
          picUrl,
          title
        }
      })
    }
  }
}
</script>

<style scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.2rem 0;
  font-size: 15px;
  background-color: #FAFAFC;
  color: #81748E;
}
.van-loading {
  padding-top: 200px;
  color: #8648D3;
}
.song-name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-top: -18px;
  margin-bottom: 0.266667rem;
}
.van-col {
  padding-left: 0.26rem;
  height: 8.6rem;
  display: flex;
  flex-flow: column wrap;
  overflow-x: scroll;
}
.van-col::-webkit-scrollbar {
  height: 0;
}
.van-row {
  margin-right: 0.26rem;
  width: 2.8rem;
  height: 160px;
}
.player-icon {
   font-size: 25px;
}
</style>