<template>
	<div id="webgl-content">
		<h1>Game Project</h1>
		<GameProjectCanvas :vertex-shader-source="vertexShaderSource" :fragment-shader-source="fragmentShaderSource" />
	</div>
</template>

<script setup>
import GameProjectCanvas from '@/components/GameProjectCanvas.vue'
import { ref } from 'vue'
import basicVS from '@/assets/shaders/common/basicVS.vert'
import basicFS from '@/assets/shaders/common/basicFS.frag'
// const shaderType = ref(0)
const vertexShaderSource = ref(basicVS)
const fragmentShaderSource = ref(basicFS)
</script>

<style scoped>
#webgl-content {
	justify-content: space-evenly;
}

#webgl-content h1 {
	font-size: 0.9rem;
	font-weight: bold;
	border-bottom: 1px solid #ccc;
	margin: 0px 0px;
}
</style>
