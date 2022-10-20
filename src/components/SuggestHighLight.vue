<template>
  <div v-html="highLightRes"></div>
</template>

<script>
export default {
    props: {
        content: {
            type: String,
            default: ''
        },
        keyword: {
            type: String,
            default: ''
        }
    },
    computed: {
        highLightRes() {
            return this.highLight(this.content, this.keyword);
        }
    },
    methods: {
        //搜索关键字高亮
        highLight(str, key) {
            const reg = new RegExp(key, 'ig');
            return str.replace(reg, (val) => {
                return `<span style="color:#8648D3">${val}</span>`
            })
        }
    }

}
</script>

<style>

</style>