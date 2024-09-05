<template>
  <div id="webgl-canvas">
    <div id="content">
      HTMLCanvasElement will be inserted below
    </div>
    <button :class="{ '_state-show': isShowCode }" @click="isShowCode = !isShowCode">
      Show Code
    </button>
    <transition name="slide">
      <code v-if="isShowCode">{{ fragmentShaderSource }}</code>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import Engine from '@/lib/engine'
interface CanvasProps {
	vertexShaderSource?: string
	fragmentShaderSource?: string
}
const isShowCode = ref(false)

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
	margin: 0 10px;
	padding: 0 10px;
	border: solid 2px var(--background-accent-10);
	background-color: var(--foreground-inverted);
	text-align: center;
}

#webgl-canvas button {
	margin: 20px;
}

code {
	display: block;
	background-color: #eeeeee;
}

._state-show {
	background-color: #bbb;

	&:after {
		transform: rotateX(180deg);
		margin-top: -10px;
	}
}
</style>
