<template>
  <div
    id="main"
    class="mb-6"
  >
    <aside id="index">
      <section>
        <h1>Shader Menu</h1>
        <select v-model="fragmentShaderSource">
          <option
            disabled
            value=""
          >
            Select one
          </option>
          <option
            v-for="fs in fragmentShaderList"
            :key="fs.name"
            :value="fs.source"
          >
            {{ fs.name }}
          </option>
        </select>
      </section>
    </aside>
    <WebGLCanvas
      :vertex-shader-source="vertexShaderSource"
      :fragment-shader-source="fragmentShaderSource"
    />
  </div>
  <!-- <script type="text/javascript" src="router.js"></script> -->
</template>

<script setup>
import WebGLCanvas from '@/components/WebGLCanvas.vue'
import { ref } from 'vue'
import basicVS from '@/lib/shaders/basicVS.vert'
import basicFS from '@/lib/shaders/basicFS.frag'
import okuyukiFS from '@/lib/shaders/okuyuki.frag'
import enFS from '@/lib/shaders/en.frag'
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
canvas {
	width: 50%;
	height: 50%;
}

#index {
	width: 200px;
	float: left;
	padding: 5px;
}

#index section > h1 {
	font-size: 120%;
	font-weight: bold;
	border-bottom: 1px solid #ccc;
	margin: 0px 0px;
}

#content {
	width: 850px;
	/* height: 550px; */
	float: left;
	border-left: 1px solid #ccc;
	padding: 20px;
}
</style>
