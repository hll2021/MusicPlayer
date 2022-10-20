<template>
  <div>
        <!-- 头部导航 -->
    <van-nav-bar title="歌单" fixed z-index="10" @click-left="$router.back()">
        <template #left>
            <van-icon name="arrow-left" color="#8648D3" size="0.48rem" />
        </template>
    </van-nav-bar>
        
        <!-- 虚化背景 -->
    <div class="background-wrap">
        <div class="background" :style="`background-image: url(${picUrl})`">
        </div>
    </div>
    
     <!-- 歌单信息 -->
    <van-row class="title-wrap">
        <van-col class="cover-img" span="8" offset="1">
            <van-image width="100%" height="3.5rem" fit="cover" :src="picUrl" />
        </van-col>
        <van-col class="title" span="12" offset="1">
            {{ title }}
            <van-loading v-if="this.playlist.length===0" class="loading">
                加载中...
            </van-loading>
            <p v-else class="van-multi-ellipsis--l3 recommend-title">推荐歌曲:
                <span v-for="(item, index) in playlist" :key="index">
                    《{{item.name}}》
                </span>
                </p>
            </van-col>
        
        </van-row>
            
            <!-- 歌单曲目 -->
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <p class="res-title">
            <van-icon color="#8648D3" name="smile-o" size="0.48rem" /> 全部歌曲
        </p>
        <SongItem v-for="(item, index) in playlist" :key="item.id" :index="index" :name="item.name"
            :author="item.ar[0].name" :id="item.id" :pic-url="item.al.picUrl">
        </SongItem>
    </van-list>
  </div>
</template>

<script>
import { getAllSongsFromPlaylistAPI } from '@/api/index'
import SongItem from '@/components/SongItem.vue'
export default {
    data() {
        return {
            id: this.$route.query.id,
            picUrl: this.$route.query.picUrl,
            title: this.$route.query.title,
            playlist: [],
            page: 1,//分页数
            loading: false,
            finished: false,
        }
    },
    name:'playlist-view',
    created() {
        this.getSongs();
    },
    methods: {
        async getSongs() {
            const res = await getAllSongsFromPlaylistAPI({
                id: this.id,
                limit: 10,
                offset: (this.page - 1) * 10,
                realIP: '116.25.146.177'
            });
            //过滤付费、vip和无版权的歌曲
            this.playlist = res.data.songs.filter(song => {
                return song.fee === 8 || song.fee === 0 && !song.noCopyrightRcmd;
            });
        },
        // 加载下一页数据, 内部自动把loading改为true
        async onLoad() {
            this.page++;
            const res = await getAllSongsFromPlaylistAPI({
                id: this.id,
                limit: 10,
                offset: (this.page - 1) * 10
            });
            if (res.data.songs.length === 0) {
                //没有更多数据可以加载
                this.finished = true;
                this.loading = false;
            } else {
                this.playlist.push(...res.data.songs.filter(song => {
                    return song.fee === 8 || song.fee === 0;
                }));
                this.loading = false;
            }
        }
    },
    components: {
        SongItem
    }
}
</script>

<style>
.title-wrap {
    margin: 25px 0;
}
.background-wrap {
    position: relative;
}
.background {
    background-position: 50%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 150px;
    overflow: hidden;
    /*模糊背景 */
    filter: blur(25px);
    opacity: 1;
    z-index: 1;
}
/* 背景图为白色时字体会显示不清，需加一个黑色半透明背景 */
.background::before {
    content: " ";
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    overflow: hidden;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 150px;
}
.title-wrap .cover-img {
    z-index: 2;
}
.title-wrap .title {
    padding-top: 5px;
    font-size: 18px;
    color: #fff;
    z-index: 2;
}
.title-wrap .recommend-title {
    font-size: 14px;
    padding: 20px 0 0 0;
    color: #fff;
}
.title-wrap .loading {
    margin-top: 20px;
    height: 16px;
    text-align: center;
}
.res-title {
    padding: 0 0.3rem;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
    color: #81748E;
}
</style>