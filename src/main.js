//import { Lazyload } from 'vant';
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/mobile/flexible.js'
import '@/styles/reset.css'
//import 'vant/es/toast/style';
//import 'vant/es/dialog/style';
const { createApp } = Vue;
createApp(App).use(store).use(router).use(vant.Lazyload).mount('#app');
