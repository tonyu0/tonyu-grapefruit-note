<script setup lang="ts">
// https://vuejs.org/api/sfc-script-setup.html#script-setup
import { RouterView } from 'vue-router'
import Header from '@/components/LayoutHeader.vue'
import Footer from '@/components/LayoutFooter.vue'

// page definition
const topTitle = 'tonyu grapefruit note'
const pages = [
	{ id: 0, name: 'Notes', to: '/' },
	{ id: 1, name: 'Works', to: '/works' },
	{ id: 2, name: 'About', to: '/articles/blog/about' },
]
</script>

<template>
	<div class="layout">
		<router-link class="m-10" to="/">
			<h1>
				{{ topTitle }}
			</h1>
		</router-link>
		<Header :pages="pages" />
		<main class="main-content">
			<RouterView :key="$route.fullPath" />
		</main>
		<Footer />
	</div>
</template>
