<template>
	<div id="webgl-canvas">
		<div id="content">HTMLCanvasElement will be inserted below</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import Engine from '@/lib/engine'
import { canvasPlane } from '@/lib/primitives'
interface CanvasProps {
	vertexShaderSource?: string
	fragmentShaderSource?: string
}

const props = withDefaults(defineProps<CanvasProps>(), {
	vertexShaderSource: '',
	fragmentShaderSource: '',
})

let engine: Engine
onMounted(() => {
	engine = new Engine()
	engine.loop()
})

// stop drawing loop before leaving this page
onBeforeRouteLeave(() => {
	engine.stopLoop()
	// Instead of deprecated "next()", simply write "return" to allow transitioning.
	// Navigation guard, which is a Vue Router's wrapper of History API, enable various actions before actual transition.
	return true
})

watch(props, () => {
	if (props.vertexShaderSource && props.fragmentShaderSource) {
		engine.loadShaders(props.vertexShaderSource, props.fragmentShaderSource)
		const primitive = canvasPlane()
		engine.loadModel(primitive.vertices, primitive.indices)
	}
})
</script>

<style scoped>
#webgl-canvas {
	border: solid 2px var(--background-accent-10);
	background-color: var(--foreground-inverted);
	text-align: center;
}

code {
	display: block;
	background-color: #eeeeee;
}
</style>
