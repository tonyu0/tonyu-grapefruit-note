<script setup lang="ts">
const pages = [
	{ id: 0, name: 'WebGL', to: '/webgl' },
	{ id: 1, name: 'Test', to: '/test' },
]
</script>

<template>
	<div>
		<h1>List of works</h1>
		<ul>
			<template v-for="page in pages" :key="page.id">
				<li class="work-item my-4">
					<router-link :to="page.to">
						{{ page.name }}
					</router-link>
				</li>
			</template>
		</ul>
	</div>
</template>
