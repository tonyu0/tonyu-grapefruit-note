import HelloWorldVue from '@/components/HelloWorld.vue'
import HomeVue from '@/views/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeVue,
        },
        {
            path: '/hello',
            name: 'Hello',
            component: HelloWorldVue,
        },
        {
            path: '/articles/:id',
            name: 'article',
            component: () => import('@/views/ArticleDetail.vue'),
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: () => import('@/views/NotFound.vue'),
        },
        {
            path: '/dbtutorial',
            name: 'DBTutorial',
            component: () => import('@/views/DBTutorial.vue'),
        },
        {
            path: '/webgl', // main, app, page0, glsl
            name: 'WebGL',
            component: () => import('@/views/WebGL.vue'),
        },
        {
            path: '/about/:slug',
            name: 'About',
            component: () => import('@/views/AboutItem.vue'),
        },
    ],
})

export default router
