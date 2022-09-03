<template>
  <div id="content">
    Now {{ props.shaderType }}
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
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import Engine from '@/lib/engine'
interface  CanvasProps {
  shaderType?: number
}

const props = withDefaults(defineProps<CanvasProps>(),{
  shaderType: 0
})

onMounted(() => {
	const engine = new Engine()
	engine.loop()
})
</script>
