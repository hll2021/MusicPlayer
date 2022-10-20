<template>
  <!-- 路由视口 -->
  <router-view style="padding: 1.23rem 0"></router-view>

  <!-- 迷你播放器 -->
  <div class="mini-player" 
    v-if="currentId && !fullScreen"
    :style="{'bottom': this.$route.meta.title ? '1.33rem': '0.13rem'}">
    <keep-alive>
      <MiniPlayer/>
    </keep-alive>
  </div>
  <!-- 迷你播放器占位空白 -->
  <div class="mini-placeholder" 
    v-show="currentId && !fullScreen">
  </div>

  <!-- 播放音乐的标签
        看接口文档: 音乐地址需要带id去获取(但是有的歌曲可能404)
        https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e9%9f%b3%e4%b9%90-url
       -->
  <div class="audio-wrap">
    <audio v-if="currentId" 
      id="audio" ref="audio" preload="auto" loop :src="songUrl"></audio>
  </div>
</template>

<script>
import MiniPlayer from '@/components/MiniPlayer.vue'
export default {
  components: {
    MiniPlayer
  },
  computed: {
    currentId() {
      return this.$store.state.currentId;
    },
    fullScreen() {
      return this.$store.state.fullScreen;
    },
    songUrl() {
      return this.$store.getters.songUrl;
    }
  }
}
</script>

<style>
.mini-player {
  position: fixed;
  left: 50%;
  bottom: 50px;
  height: 60px;
  width: 350px;
  background-color: #ccc;
  transform: translateX(-50%);
  border-radius: 80px;
  z-index: 1;
}
.mini-placeholder {
  height: 60px;
  width: 350px;
}
.audio-wrap {
  position: absolute;
  left: 50%;
  top: calc(100vh - 50px);
  transform: translateX(-50%);
  z-index: 10002;
}
#audio {
  width: 340px;
  height: 30px;
}
#audio::-webkit-media-controls-time-remaining-display,
#audio::-webkit-media-controls-current-time-display {
  font-size: 12px;
}
#audio::-webkit-media-controls-panel,
#audio::-webkit-media-controls-enclosure {
  background-color: rgba(224,224,224,0.5);
}
#audio::-webkit-media-controls-timeline {
  min-width: 230px;
  width: 100%;
  
} 
#audio::-webkit-media-controls-play-button {
  display: none;
}
</style>