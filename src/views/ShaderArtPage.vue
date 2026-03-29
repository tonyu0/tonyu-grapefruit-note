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
		<ShaderArtCanvas :vertex-shader-source="vertexShaderSource" :fragment-shader-source="fragmentShaderSource" />
	</div>
</template>

<script setup>
import ShaderArtCanvas from '@/components/ShaderArtCanvas.vue'
import { ref } from 'vue'
import basicVS from '@/assets/shaders/common/basicVS.vert'
import basicFS from '@/assets/shaders/common/basicFS.frag'
import okuyukiFS from '@/assets//shaders/art/okuyuki.frag'
import enFS from '@/assets/shaders/art/en.frag'
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
