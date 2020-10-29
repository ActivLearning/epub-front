import Vue from 'vue'
import hevueImgPreview from 'hevue-img-preview'
import YunserUI from 'yunser-ui-vue'
import 'yunser-ui-vue/dist/yunser-ui.css'
import App from './App'
import router from './router'
import storage from '@/util/storage'
import ui from './components/index'
import config from './config/index'
import './util/highlight'
import './scss/main.scss'

Vue.config.productionTip = false

Vue.prototype.$storage = storage

Vue.use(hevueImgPreview)
Vue.use(YunserUI)
Vue.use(ui)
Vue.use(config, router)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
