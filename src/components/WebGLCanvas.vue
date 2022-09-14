<template>
  <div id="content">
    <p>
      <input
        id="alpha"
        type="range"
        min="0"
        max="100"
        value="70"
      > vertex alpha
    </p>
    <p>
      <input
        id="transparency"
        type="radio"
        name="blend"
        checked
      > transparency
      <input
        id="add"
        type="radio"
        name="blend"
      > add
    </p>
    <code>{{ fragmentShaderSource }}</code>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import Engine from '@/lib/engine'
interface  CanvasProps {
  vertexShaderSource?: string
  fragmentShaderSource?: string
}

const props = withDefaults(defineProps<CanvasProps>(),{
  vertexShaderSource: "",
  fragmentShaderSource: ""  
})

let engine: Engine
onMounted(() => {
	engine = new Engine()
	engine.loop()
})

watch(props, () => {
  if(props.vertexShaderSource && props.fragmentShaderSource)
  {
    engine.loadShaders(props.vertexShaderSource, props.fragmentShaderSource)
  }
})
</script>
