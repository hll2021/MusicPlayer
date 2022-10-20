<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar fixed z-index="10">
    <template #left>
      <van-icon v-if="$route.meta.showBackArrow" name="arrow-left" size="0.48rem" 
        class="left-incon" color="#8648D3" @click="$router.push('/')"/>
    </template>
    <template #title>
      <van-icon :name="$route.meta.icon" color="#8648D3" size="0.5rem"/> 
      {{ $route.meta.title }}
    </template>
    </van-nav-bar>

    <!-- 二级路由页面 -->
    <router-view v-slot="{ Component }" style="padding: 1.23rem 0 1.33rem 0">
      <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
      </transition>
    </router-view>

    <!-- 底部导航栏 -->
    <van-tabbar route active-color="#8648D3" fixed>
      <van-tabbar-item replace to="/layout/home" icon="music-o">
        首页
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/search" icon="search">
        搜索
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout-view'
}
</script>

<style>
:root {
  --van-nav-bar-title-text-color: #8648D3
}
/* 被fade组件包裹的元素进入开始和离开结束时的样式 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* 被fade组件包裹的元素进入结束和离开开始时的样式 */
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
/* 被fade组件包裹的元素进入过渡时的样式 */
.fade-enter-active {
  /* all 将所有CSS属性设置过渡效果 */
  transition: all 0.3s ease;
}
/* 被fade组件包裹的元素离开过渡时的样式 */
.fade-leave-active {
  /* cubic-bezier 自定义速度曲线 */
  transition: all 0.2s cubic-bezier(1, 0.6, 0.6, 1);
}
</style>