<template>
	<div id="webgl-content">
		<GameProjectCanvas />
	</div>
</template>

<script setup>
import GameProjectCanvas from '@/components/GameProjectCanvas.vue'
</script>

<style scoped>
#webgl-content {
	display: flex;
	justify-content: space-evenly;
}

#webgl-content h1 {
	font-size: 0.9rem;
	font-weight: bold;
	border-bottom: 1px solid #ccc;
	margin: 0px 0px;
}
</style>
