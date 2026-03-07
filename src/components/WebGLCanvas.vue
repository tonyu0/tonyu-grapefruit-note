<template>
	<div id="webgl-canvas">
		<div id="content">HTMLCanvasElement will be inserted below</div>
		<AccordionSystem title="Show Code" style="max-width: 960px">
			<code>{{ fragmentShaderSource }}</code>
		</AccordionSystem>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import AccordionSystem from './AccordionSystem.vue'
import Engine from '@/lib/engine'
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
onBeforeRouteLeave((to, from, next) => {
	engine.stopLoop()
	next()
})

watch(props, () => {
	if (props.vertexShaderSource && props.fragmentShaderSource) {
		engine.loadShaders(props.vertexShaderSource, props.fragmentShaderSource)
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
