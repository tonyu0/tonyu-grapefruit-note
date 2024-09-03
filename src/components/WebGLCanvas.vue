<template>
  <div id="content">
    <button
      :class="{ '_state-show': isShowCode }"
      @click="isShowCode = !isShowCode"
    >
      Show Code
    </button>
    <transition name="slide">
      <code v-if="isShowCode">{{ fragmentShaderSource }}</code>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch, ref } from 'vue'
import {onBeforeRouteLeave} from 'vue-router'
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
code {
	display: inline-block;
	background-color: #eeeeee;
	border-radius: 3px;
}

._state-show {
	background-color: #717171;
	text-decoration: none;

	/* :after {
    transform: rotateX(180deg);
    margin-top: -10px;
  } */
}
</style>
