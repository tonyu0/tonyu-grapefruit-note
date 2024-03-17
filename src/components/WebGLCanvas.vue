<template>
  <div id="content">
    <button @click="isShowCode = !isShowCode" :class="{ '_state-show': isShowCode }">Show Code</button>
    <transition name="slide">
      <code v-if="isShowCode">{{ fragmentShaderSource }}</code>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch, ref } from 'vue'
import Engine from '@/lib/engine'
interface CanvasProps {
  vertexShaderSource?: string
  fragmentShaderSource?: string
}
let isShowCode = ref(false)

const props = withDefaults(defineProps<CanvasProps>(), {
  vertexShaderSource: "",
  fragmentShaderSource: ""
})

let engine: Engine
onMounted(() => {
  engine = new Engine()
  engine.loop()
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