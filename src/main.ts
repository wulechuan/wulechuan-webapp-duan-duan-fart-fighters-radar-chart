import Vue from 'vue'
import App from './视图层/应用根基.vue'
import router from './vue-路由系统'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
