import Vue from 'vue'
import VueRouter from '../../lib/vue-router'
import Home from '../views/Home.vue'

/*
* VueRouter是一个插件
*   1）实现并声明两个组件router-view router-link
*   2）install: this.$router.push()
* */
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        children: [
            {
                path: '/about/info',
                component: {
                    render(h) {
                        return h('div', 'info page')
                    }
                }
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
