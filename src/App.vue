<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// ~~~ Add from directus example ~~~
import { RouterView } from "vue-router";
import Notice from "@/components/Notice.vue";
import Header from "@/components/Header.vue";
import Info from "@/components/Info.vue";
import Footer from "@/components/Footer.vue";
import HelloWorld from '@/components/HelloWorld.vue';
import {ref} from 'vue'

let pokemon = ref(null)
// root level await
async function pressed(info: string) {
  alert("Pressed!!!" + info)
  const data = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
  const json = await data.json()
  pokemon.value = json
}
</script>

<!-- <script lang="ts">
import {useAttrs} from 'vue'
const attrs = useAttrs()
export default {
  inheritAttrs: false
}
</script> -->

<template>
<!-- Add from directus example -->
  <div class="layout">
    <Notice />
    <Header />
    <RouterView :key="$route.fullPath" />
    <Info />
    <Footer />
  </div>
  <!--  -->
  <HelloWorld name="tonyu" @pressed="pressed"/>
  <!-- <img :src="pokemon.spirites.front_shiny" /> -->
  <!-- <div class="p-14">
    <router-link class="flwx justify-center text-4xl text-yellow-700" to="/">Home</router-link>
  </div> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
