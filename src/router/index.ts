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
			path: '/webgl',
			name: 'WebGL',
			component: () => import('@/views/WebGL.vue'),
		}
	],
})

export default router
