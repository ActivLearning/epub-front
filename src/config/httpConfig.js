// import qs from 'qs';

export default function (Vue) {
    const http = Vue.http;

    // http.defaults.baseURL = `${window.location.origin}/v2/`;
    http.defaults.timeout = 15000;
    // http.defaults.transformRequest = [data => qs.stringify(data)];
    
    http.interceptors.request.use((config) => {
        return config;
    }, error => Promise.reject(error));
    http.interceptors.response.use((response) => {
        const rData = response;
        return rData.data;
    }, (error) => {
        return Promise.reject(error);
    });
}
