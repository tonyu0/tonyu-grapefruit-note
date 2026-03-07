<template>
	<div id="webgl-content">
		<aside>
			<h1>Shader Menu</h1>
			<select v-model="fragmentShaderSource">
				<option disabled value="">Select one</option>
				<option v-for="fs in fragmentShaderList" :key="fs.name" :value="fs.source">
					{{ fs.name }}
				</option>
			</select>
		</aside>
		<WebGLCanvas :vertex-shader-source="vertexShaderSource" :fragment-shader-source="fragmentShaderSource" />
	</div>
</template>

<script setup>
import WebGLCanvas from '@/components/WebGLCanvas.vue'
import { ref } from 'vue'
import basicVS from '@/lib/shaders/basicVS.vert'
import basicFS from '@/lib/shaders/basicFS.frag'
import okuyukiFS from '@/lib/shaders/okuyuki.frag'
import enFS from '@/lib/shaders/en.frag'
// const shaderType = ref(0)
const vertexShaderSource = ref(basicVS)
const fragmentShaderSource = ref('')
const fragmentShaderList = [
	{ name: 'basic.frag', source: basicFS },
	{
		name: 'okuyuki.frag',
		source: okuyukiFS,
	},
	{
		name: 'en.frag',
		source: enFS,
	},
]
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

#webgl-content aside {
	margin: 0 10px;
	padding: 0 10px;
	border: solid 2px var(--background-accent-10);
	background-color: var(--foreground-inverted);
}
</style>
