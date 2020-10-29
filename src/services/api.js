import Vue from 'vue';

const defaultConfig = {
    showLoading: false,
    showCodeError: true,
    showNetworkError: true,
};

// 协议
export const wikipedia = {
    searchWikipedia(data, interactionConfig = defaultConfig) {
        return Vue.http.get('https://en.wikipedia.org/w/rest.php/v1/search/page', { params: data, ...interactionConfig });
    },
};
