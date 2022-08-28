<template>
	<div class="w-full flex justify-center">
		<input type="text" placeholder="enter pokemon here" class="mt-10 p-2 border-blue-500 border-2" v-model="text"/>
	</div>
	<div class="mt-10 p-4 flex flex-wrap justify-center">
		<div class="ml-4 text-2x text-blue-200" v-for="(pokemon, idx) in filtered" :key="idx">
			<router-link :to="`/about/${urlIdLookup[pokemon.name]}`">
				{{pokemon.name}}
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import {reactive, toRefs, computed} from "vue"
// import {onMounyrf}
export default {
	name: 'Home',
	components: {

	},
	setup() {
		// onMounted(async () => {stripe = swait loadStripe(
			// import.meta.env.VUEW_STRIPE_KEY
		//)})
		// function redirect(){
			// stripe.redirectToCheckout({}) // redirect infomation
		//} // これでview側で@click="redirect"でイベント軌道可能

		const state: any = reactive({
			pokemons: [],
			urlIdLookup:{},
			text: "",
			filtered: computed(()=>update())
		})
		function update() : any {
			if(!state.text) {
				return []
			}
			return state.pokemons.filter((pokemon: any)=>pokemon.name.includes(state.text))
		}

		fetch("https://pokeapi.co/api/v2/pokemon?offset=0")
		.then(res => res.json())
		.then(data => {console.log(data)
			state.pokemons = data.results;
			state.urlIdLookup = data.results.reduce((acc : any, cur: any, idx: number) => 
				acc={...acc, [cur.name]:idx+1},{})
		})
		return {...toRefs(state)}
	}
}
</script>