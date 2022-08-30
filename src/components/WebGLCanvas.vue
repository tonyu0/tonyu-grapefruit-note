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
  </div>
</template>

<script lang="ts" setup>
	import {ref, onMounted} from 'vue'
	import { GLUtilities } from '@/lib/gl';
	onMounted(() => {
	const [canvas, gl] = GLUtilities.initialize()
	function mouseMove(e: MouseEvent) {
	const cw = canvas.width
	const ch = canvas.height
	const mx = e.offsetX / cw
	const my = e.offsetY / ch
	console.log(mx, my)
	}
	canvas.addEventListener('mousemove', mouseMove, true)
	// gl.enable(gl.CULL_FACE)
	gl.enable(gl.DEPTH_TEST)
	gl.depthFunc(gl.LEQUAL)
	gl.enable(gl.STENCIL_TEST)
})
</script>