import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('@/views/HomePage.vue'),
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
		},
	],
	scrollBehavior() {
		// always scroll to top
		return { top: 0 }
	}
})

export default router
