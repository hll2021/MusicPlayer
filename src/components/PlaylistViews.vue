<template>
<van-tag class="viewed-tag" color="#DEDBDB" text-color="#fff" round>
    <van-icon name="play" class="icon" />{{ views }}
</van-tag>
</template>

<script>
import { playlistViewsAPI } from '@/api'
export default {
    data() {
        return{
            views: 0,
            unit: ''
        }
    },
    props: {
        id: Number
    },
    async created() {
        const res = await playlistViewsAPI({ id: this.id });

        if(res.data.playCount >= 1e8) {
            this.views = (res.data.playCount / 1e8).toFixed(1) + '亿';
        } else {
            this.views = (res.data.playCount / 1e4).toFixed(1) + '万';
        }
    }
}
</script>

<style>
.viewed-tag {
    top: -18px;
    z-index: 1;
    padding: 2px 5px 2px 2px;
}
.icon {
    vertical-align: baseline;
}
</style>