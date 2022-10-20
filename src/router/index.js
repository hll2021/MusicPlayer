import LayoutView from '@/views/LayoutView'
import HomeView from '@/views/HomeView'
const { createRouter, createWebHashHistory } = VueRouter;
const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    redirect: '/layout/home',
    component: LayoutView,
    children: [
      {
        path: 'home',
        component: HomeView,
        meta: {
          title: '发现音乐',
          icon: 'music-o',
          showBackArrow: false
        }
      },
      {
        path: 'search',
        component: () => import('@/views/SearchView'),
        meta: {
          title: '寻找音乐',
          icon: 'search',
          showBackArrow: true
        }
      }
    ]
  },
  {
    path: '/playlist',
    component: () => import('@/views/PlaylistView')
  },
  {
    path: '/fullscreenplay',
    component: () => import('@/views/FullScreenPlay')
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
