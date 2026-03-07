<script setup>
import { RouterLink } from 'vue-router'

defineProps({
	pages: {
		type: Array,
		required: true,
	},
})
</script>

<template>
	<header class="notice">
		<nav>
			<template v-for="page in pages" :key="page.id">
				<router-link :to="page.to">
					{{ page.name }}
				</router-link>
			</template>
		</nav>
		<!-- <i class="material-icons-outlined">close</i> -->
	</header>
</template>

<style scoped></style>
