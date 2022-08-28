<script setup lang="ts">
import { ref } from 'vue'

// defineProps<{ msg: string }>()

const count = ref(0)

const emits = defineEmits(["pressed"])
function getAlert() {
  emits("pressed", "detailed")
}
interface props {
  name?: string
}
const props = withDefaults(defineProps<props>(), {name: 'tonyu'})

</script>

<template>
   <h1>{{props.name}}, Hello. </h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>
  <button @click="getAlert">Press!!!</button>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <svg>
    <g>
      <circle cx="30" cy="30" r="30" fill="red"></circle>
    </g>
  </svg>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
