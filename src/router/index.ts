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
			path: '/articles/:category/:id',
			name: 'article',
			component: () => import('@/views/ArticleDetail.vue'),
		},
		{
			path: '/:catchAll(.*)',
			name: 'not-found',
			component: () => import('@/views/NotFound.vue'),
		},
		{
			path: '/works',
			name: 'Works',
			component: () => import('@/views/WorkList.vue'),
		},
		{
			path: '/shader-art',
			name: 'Shader Art (WebGL)',
			component: () => import('@/views/ShaderArtPage.vue'),
		},
		{
			path: '/game-project',
			name: 'Game Priject (WebGL)',
			component: () => import('@/views/GameProjectPage.vue'),
		},
		{
			path: '/search-result',
			name: 'search-result',
			component: () => import('@/views/SearchResult.vue'),
		},
	],
	scrollBehavior() {
		// always scroll to top
		return { top: 0 }
	},
})

export default router
