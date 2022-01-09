import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import PageDefault from '../pages/page-default.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: '首页',
        component: PageDefault,
    },
]

const router = new VueRouter({
    routes,
})

export default router
