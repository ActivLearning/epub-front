import Vue from 'vue'
import YunserUI from 'yunser-ui-vue'
import 'yunser-ui-vue/dist/yunser-ui.css'
import App from './App'
import router from './router'
import storage from '@/util/storage'
import ui from './components/index'
import './util/highlight'
import './scss/main.scss'

Vue.config.productionTip = false

Vue.prototype.$storage = storage

Vue.use(YunserUI)
Vue.use(ui)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
