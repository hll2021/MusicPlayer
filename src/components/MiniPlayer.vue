<template>
    <div @click="toFullScreen">
            <!-- 背景图 -->
       <div class="min-song-bg-wrap">
         <van-image class="min-song-bg" :src="songInfo.picUrl" fit="none"/>
       </div>
       <div class="min-song-wrap">
         <!-- 歌曲封面 -->
         <div class="min-song-turn">
           <van-image class="min-song-image" :src="songInfo.picUrl" width="1.28rem" height="1.28rem" round /> 
         </div>
         <!-- 歌曲名 -->
         <div class="min-song-title-wrap">
            <span class="min-song-title">
                {{songInfo.name + ' - ' + songInfo.author}}
            </span>
         </div>    
         <!-- 播放/暂停按钮 -->
         <van-icon class="mini-player-btn" size="1rem" 
             :name="isPlaying ? 'pause-circle-o' : 'play-circle-o'"
             @click.stop="audioStateChange"
            />
       </div>
    </div>
</template>

<script>
export default {
    computed: {
        songInfo() {
            return this.$store.state.currentSongInfo
        },
        isPlaying() {
            return this.$store.state.isPlaying
        },
        firstCount() {
            return this.$store.state.firstCount
        }
    },
    methods: {
        toFullScreen() {
            //首次跳转全屏播放页
            if (this.firstCount) {
                vant.Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 500
                });
                this.$store.commit('setFirstCount', 0);
            }

            this.$store.commit('setFullScreen', true);
            this.$router.push('/fullscreenplay');
        },
        audioStateChange() { // 播放按钮 - 点击事件
            const audio = document.querySelector('#audio');
            if (!this.isPlaying) { // 如果状态为false
                audio.play() // 调用audio标签的内置方法play可以继续播放声音
            } else {
                audio.pause() // 暂停audio的播放
            }
            this.$store.commit('setPlayingState', !this.isPlaying); // 设置对立状态
        }
    }
}
</script>

<style>
.min-song-bg-wrap {
    position: absolute;
    left: 0;
    right: 0;
    height: 60px;
    width: 350px;
    border-radius: 80px;
    overflow: hidden;
    background-color: #ccc;
    z-index: 1;
}
.min-song-bg {
    /* 模糊背景 */
    filter: blur(20px);
    opacity: 0.7;
}
/*纯白色的图片做背景, 歌词白色看不到了, 在背景前加入一个黑色半透明蒙层解决 */
.mini-song-bg::before {
    content: " ";
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    overflow: hidden;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 60px;
}
.min-song-turn {
    position: absolute;
    left: -5px;
    bottom: -2px;
    width: 70px;
    height:70px;
    background: url("@/views/FullScreenPlay/img/bg.png") no-repeat;
    background-position: top;
    background-size: 100%;
    z-index: 100;
}
.min-song-image {
    position: absolute;
    left: 11px;
    bottom: 11px;
    z-index: 10;

}
.mini-player-btn {
    position: absolute;
    left: 290px;
    bottom: 12px;
    color: #fff;
    z-index: 100;
}
.min-song-title-wrap {
    position: absolute;
    left: 70px;
    bottom: 15px;
    padding-left: 5px;
    height: 35px;
    width: 200px;
    font-size: 15px;
    text-align: left;
    line-height: 35px;
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    z-index: 1000;
}

</style>