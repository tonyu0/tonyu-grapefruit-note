<template>
	<div id="webgl-canvas">
		<h1>Game Project</h1>
		<div id="content">HTMLCanvasElement will be inserted below</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import Engine from '@/lib/engine'
import mainVS from '@/assets/shaders/game/mainVS.vert'
import mainFS from '@/assets/shaders/game/mainFS.frag'

import { Vec3, Mat4 } from '@/lib/math'

let engine: Engine
onMounted(() => {
	engine = new Engine()
	engine.loop()

	// --- Load shader ---
	engine.loadShaders(mainVS, mainFS)

	// --- Load model ---
	const vertices: number[] = [
		/* 3 (position) + 4 (color) (interleave) */
		0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, -1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0,
	]
	const indices: number[] = [0, 1, 2]
	const vertexAttrNames: string[] = ['position', 'color']
	const vertexAttrStrides: number[] = [3, 4]
	engine.createVertexBuffer(vertices, 7 /* 3 (position) + 4 (color) */, vertexAttrNames, vertexAttrStrides)
	engine.createIndexBuffer(indices)

	// --- Load transform matrix ---
	const worldMat = Mat4.identity()
	const viewMat = Mat4.lookAt(
		new Vec3(0.0, 1.0, 3.0) /*eye*/,
		new Vec3(0.0, 0.0, 0.0) /*target*/,
		new Vec3(0.0, 1.0, 0.0) /*up*/,
	)
	const projMat = Mat4.createPerspective(90.0, 400.0, 300.0, 0.1, 100.0)
	engine.setTransformMatrix(worldMat.data, viewMat.data, projMat.data)
})

// stop drawing loop before leaving this page
onBeforeRouteLeave(() => {
	engine.stopLoop()
	engine.destroy()
	// Instead of deprecated "next()", simply write "return" to allow transitioning.
	// Navigation guard, which is a Vue Router's wrapper of History API, enable various actions before actual transition.
	return true
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
