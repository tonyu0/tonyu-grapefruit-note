<script setup lang="ts">
import { ref } from 'vue'

// defineProps<{ msg: string }>()

const count = ref(0)

const emits = defineEmits(['pressed'])
function getAlert() {
	emits('pressed', 'detailed')
}
interface Props {
	name?: string
}
const props = withDefaults(defineProps<Props>(), { name: 'tonyu' })
</script>

<template>
  <h1>{{ props.name }}, Hello.</h1>
  <button @click="getAlert">
    Press!!!
  </button>
  <button
    type="button"
    @click="count++"
  >
    count is: {{ count }}
  </button>
  <input v-model="count">
  <svg>
    <g>
      <circle
        cx="30"
        cy="30"
        r="30"
        fill="red"
      />
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
