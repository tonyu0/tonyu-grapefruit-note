<template>
  <div class="w-full flex justify-center">
    <input
      v-model="text"
      type="text"
      placeholder="enter pokemon here"
      class="mt-10 p-2 border-blue-500 border-2"
    >
  </div>
  <div class="mt-10 p-4 flex flex-wrap justify-center">
    <div
      v-for="(pokemon, idx) in filtered"
      :key="idx"
      class="ml-4 text-2x text-blue-200"
    >
      <router-link :to="`/about/${urlIdLookup[pokemon.name]}`">
        {{ pokemon.name }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, computed } from 'vue'
type Pokemon = {
	name: string
}
type State = {
	pokemons: Pokemon[]
	urlIdLookup: object
	text: string
	filtered: Pokemon[]
}
export default {
	components: {},
	setup() {
		const state: State = reactive({
			pokemons: [],
			urlIdLookup: {},
			text: '',
			filtered: computed(() => update()),
		})
		function update(): Pokemon[] {
			if (!state.text) {
				return []
			}
			return state.pokemons.filter((pokemon: Pokemon) => pokemon.name.startsWith(state.text))
		}

		fetch('https://pokeapi.co/api/v2/pokemon?offset=0')
			.then((res) => res.json())
			.then((data) => {
				state.pokemons = data.results
				state.urlIdLookup = data.results.reduce(
					(acc: object, cur: Pokemon, idx: number) => (acc = { ...acc, [cur.name]: idx + 1 }),
					{},
				)
			})
		return { ...toRefs(state) }
	},
}
</script>
