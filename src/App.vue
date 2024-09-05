<script setup lang="ts">
// https://vuejs.org/api/sfc-script-setup.html#script-setup
import { RouterView } from 'vue-router'
import Header from '@/components/LayoutHeader.vue'
import Footer from '@/components/LayoutFooter.vue'
// import Sidebar from '@/components/LayoutSidebar.vue'

// page definition
const topTitle = 'tonyu lab'
const pages = [
	{ id: 0, name: 'Home', to: '/' },
	{ id: 1, name: 'WebGL', to: '/webgl' },
	{ id: 2, name: 'About', to: '/articles/about' },
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
    <!-- <div class="sidebar float-right">
        <Sidebar />
      </div> -->
    <Footer />
  </div>
</template>

<style scoped>
.content {
	width: 75%;
}

.sidebar {
	width: 25%;
}
</style>
