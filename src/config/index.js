import axios from 'axios';
import httpConfig from './httpConfig';
import routerConfig from './routerConfig';

export default {
    install(Vue, router) {
        /* 默认http配置 */
        Vue.prototype.$http = axios;
        Vue.http = axios;
        const http = Vue.http;

        http.interceptors.request.use((config) => {
            return config;
        }, error => Promise.reject(error));

        http.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            return Promise.reject(error);
        });

        httpConfig(Vue);

        if (router) {
            routerConfig(router);
        }
    },
};
