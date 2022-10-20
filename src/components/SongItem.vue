<template>
  <van-cell center @click="clickFn">
    <!-- 歌曲封面/索引 -->
    <template #icon>
        <span v-if="index === -1">
            <van-image :src="picUrl" class="newsong-img" radius="0.3rem" />
        </span>
        <span v-else class="song-index" 
            :style="{'color': currentId == id ? '#8648D3' : 'black'}">
            {{index + 1}}
        </span>
    </template>
    <!-- 歌曲名 -->
    <template #title>
        <div class="song-name-wrap">
            <p class="van-ellipsis song-name"
                :style="{'color': currentId == id ? '#8648D3' : 'black'}"> 
                {{name}} 
            </p>
            <p class="van-ellipsis song-name-label"
                :style="{'color': currentId == id ? '#8648D3' : 'rgb(147, 145, 145)'}"> 
                {{author}} 
            </p>
        </div>
    </template> 
  </van-cell>

</template>
<script>
export default {
    props: {
        name: String, 
        author: String,
        id: Number, //歌曲id，绑定这首歌曲,
        picUrl: {
            type: String,
            default: '',
        },
        index: {
            type: Number,
            default: -1,
        }
    },
    computed: {
        isPlaying() {
            return this.$store.state.isPlaying
        },
        currentId() {
            return this.$store.state.currentId;
        }
    },
    methods: {
        clickFn() {
            if (this.picUrl !== '') {
                this.$store.commit('setCurrentSongInfo', {
                    picUrl: `${this.picUrl}?imageView&thumbnail=360y360&quality=75&tostatic=0`,
                    name: this.name,
                    author: this.author
                });
            } else {//处理搜索页面的歌曲没有封面数据的问题
                this.$store.dispatch('getPicUrl', this.id);
            }
            
            this.$store.commit('setFullScreen', true);
            this.$store.commit('setPlayingState', true);
            this.$store.commit('setCurrentId', this.id);
            this.$router.push('/fullscreenplay');
        }
    },
}
</script>

<style>
:root {
    --van-cell-vertical-padding: 5px;
}
.player-icon {
    font-size: 25px;
}
.newsong-img {
    margin: 10px 20px 0 0;
    width: 1.5rem;
    height: 1.5rem;
}
.song-name-wrap {
    display: inline-block;
    width: 250px;
    height: 55px;
    vertical-align: center;
    padding-top: 10px;
}
.song-name-label{
    font-size: 12px;
}
.song-index {
    padding-right: 25px;
    font-size: 15px;
}
</style>