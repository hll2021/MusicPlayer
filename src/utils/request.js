//封装的网络请求方法
import axios from 'axios'
export const request = axios.create({
    baseURL: 'http://cloud-music.pl-fe.cn/',//服务器基地址
    withCredentials: true
});
