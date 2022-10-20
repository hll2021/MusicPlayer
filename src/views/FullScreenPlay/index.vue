<template>
    <div class="play">
      <!-- 模糊背景(靠样式设置), 固定定位 -->
      <div class="song-bg" :style="`background-image: url(${songInfo.picUrl})`">
      </div>
      <!-- 播放页头部导航 -->
      <div class="header">
        <van-icon name="arrow-down" size="20" class="left-incon" @click="fold" />
      </div>
      <!-- 留声机 - 容器 -->
      <div class="song-wrapper">
        <!-- 留声机本身(靠css动画做旋转) -->
        <div class="song-turn ani" :style="`animation-play-state:${isPlaying ? 'running' : 'paused'}`">
          <div class="song-img">
            <img style="width: 100%" :src="songInfo.picUrl" alt="" />
          </div>
        </div>
        <!-- 播放按钮显示 -->
        <div class="start-box" @click="audioStart">
          <span class="song-start" v-show="!isPlaying"></span>
        </div>
        <!-- 播放歌词容器 -->
        <div class="song-msg">
          <!-- 歌曲名 -->
          <div class="m-song-h2">
            <span class="m-song-sname">
              {{ songInfo.name }} - {{ songInfo.author }}
            </span>
          </div>
          <van-loading v-show="lyricContent.length == 0" class="play-loading" vertical>
            加载中...
          </van-loading>
          <!-- 歌词部分-滚动播放 -->
          <div class="lyricContent">
            <div class="lyric" v-for="(item, index) in lyricContent" :key="index" :class="{'curLyric': item === curLyric}">
              {{ item.replace(/\[.+?\]/,'') }}
            </div>
          </div>
        </div>
        <!-- 留声机 - 唱臂 -->
        <div class="needle" :style="`transform: rotate(${needleDeg});`"></div>
      </div>
    </div>
</template>

<script>
// 获取歌曲的歌词接口
import { getLyricByIdAPI } from '@/api'
export default {
  components: {
  },
  name: 'full-screen-play',
  data() {
    return {
      lyric: {}, // 歌词枚举对象
      lyricContent: [], //歌词内容
      curLyric: '', // 当前高亮的歌词
    }
  },
  created() {
      const audio = document.getElementById('audio');
      audio.controls = true;
      if (audio.currentTime == 0 && this.isPlaying) {
        audio.play();
      }
  },
  computed: {
    //音乐id
    currentId() {
      return this.$store.state.currentId;
    },
     // 音乐播放状态
    isPlaying() {
      return this.$store.state.isPlaying
    },
    //音乐信息
    songInfo() {
      return this.$store.state.currentSongInfo
    },
    // 留声机唱臂的位置
    needleDeg() { 
      return this.isPlaying ? '2deg' : '-20deg'
    }
  },
  watch: {
    curLyric() {
      this.$nextTick(() => this.scrollLyric());
    }
  },
  methods: {
    fold() {
      this.$store.commit('setFullScreen', false);
      this.$router.back(); 
    },
    //处理歌词
    async getSongLyr() { 
      const lyrContent = await getLyricByIdAPI({
        id: this.currentId,
        realIP: '116.25.146.177'
      });
      const lyricStr = lyrContent.data.lrc.lyric;
      this.lyric = this.formatLyr(lyricStr);
      // 高亮歌词
      this.showLyric();
    },
    //格式化歌词
    formatLyr(lyricStr) {
      const reg = /\[.+?\]/g;
      let timeArr = lyricStr.match(reg);
      let contentArr = lyricStr.split(/\[.+?\]/).slice(1);
      let j = 0;
      //处理歌词内容，加上索引
      for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i].trim() != '') {
          this.lyricContent[j] = '[' + j + ']' + contentArr[i];
          timeArr[j] = timeArr[i];
          j++;
        }
      }
      timeArr= timeArr.slice(0, j);
      
      const lyricObj = {};
      timeArr.forEach((item, index) => {
      //将时间戳转换为以秒为单位的数字
      const mToS = (item[1] * 10 + (+item[2])) * 60 ;
      const s = item[4] * 10 + (+item[5]);
      //时间数作为key, 对应歌词作为value
      lyricObj[mToS + s] = this.lyricContent[index];
      })
      return lyricObj
    },
    //点击播放按钮
    audioStart() { // 播放按钮 - 点击事件
      const audio = document.querySelector('#audio');

      if (!this.isPlaying) { 
        audio.play() //继续播放声音
      } else {
        audio.pause() // 暂停audio的播放
      }
       // 设置对立状态
      this.$store.commit('setPlayingState', !this.isPlaying);
    },
    //高亮显示当前歌词
    showLyric() {
      //监听播放audio进度, 切换歌词显示
      const audio = document.querySelector('#audio');
      audio.addEventListener('timeupdate', () => {
        let curTime = Math.floor(audio.currentTime - 0.2);
       //将时间和对应的歌词匹配
        if (this.lyric[curTime]) {
          this.curLyric = this.lyric[curTime];
        } 
      })
    },
    //滚动播放歌词
    scrollLyric() {
      let curLyr = document.querySelector('.curLyric');
      let lyricContent = document.querySelector('.lyricContent');
      //当前歌词在下方
      if (curLyr.offsetTop - lyricContent.scrollTop >= 99) {
        lyricContent.scrollTop = curLyr.offsetTop - 66;
      }
      //当前歌词在上方
      if (curLyr.offsetTop < lyricContent.scrollTop) {
        lyricContent.scrollTop = curLyr.offsetTop;
      }
    }
  },
  mounted() {
    this.getSongLyr();
  },
  unmounted() {
    const audio = document.querySelector('#audio');
    audio.controls = false;
    this.$store.commit('setFullScreen', false);
  }
}
</script>

<style scoped>
.header {
  height: 50px;
}
.play {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.song-bg {
  background-color: #161824;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  transform: scale(1.5);
  transform-origin: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  opacity: 1;
  filter: blur(25px); /*模糊背景 */
}
/*纯白色的图片做背景, 歌词白色看不到了, 在背景前加入一个黑色半透明蒙层解决 */
.song-bg::before{ 
  content: " ";
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom:0;
} 
.play-loading {
  height: 120px;
  width: 100px;
  margin: 140px 0 0 50px;
  color: #fff;
  z-index: 10;
}
.song-wrapper {
  position: fixed;
  width: 200px;
  height: 200px;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  border-radius: 80px;
  z-index: 10001;
}
.song-turn {
  width: 100%;
  height: 100%;
  background: url("./img/bg.png") no-repeat;
  background-size: 100%;
}
.ani {
  animation: turn 30s linear infinite;
}
@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}
.start-box {
  position: absolute;
  width: 120px;
  height: 120px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.song-start {
  width: 56px;
  height: 56px;
  background: url("./img/start.png");
  background-size: 100%;
}
.needle {
  position: absolute;
  transform-origin: left top;
  background: url("./img/needle-ab.png") no-repeat;
  background-size: 80%;
  width: 73px;
  height: 118px;
  top: -40px;
  left: 112px;
  transition: all 0.6s;
}
.song-img {
  width: 130px;
  height: 130px;
  position: absolute;
  left: 50%;
  top: 50%;
  overflow: hidden;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.m-song-h2 {
  padding: 10px 0 15px 0;
  width: 200px;
  font-size: 18px;
  color: #fefefe;
  text-align: center;
  overflow: scroll;
  white-space: nowrap;
}
.m-song-h2::-webkit-scrollbar {
  display: none;
}
.m-song-sname {
  white-space: nowrap;
}
.lyricContent {
  position: absolute;
  height: calc(100vh - 365px);
  min-width: 200px;
  text-align: center;
  overflow: scroll;
}
.lyricContent::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.lyric{
  padding-top: 15px;
  font-size: 14px;
  text-align: center;
  color: rgb(149, 148, 148);
}
.curLyric {
  color: #fff;
}
.left-incon {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  z-index: 10001;
  color: #fff;
}
</style>