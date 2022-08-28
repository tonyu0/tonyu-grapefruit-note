<script setup>
import IconMonospace from "./icons/Monospace.vue";
import {RouterLink} from "vue-router"
</script>

<template>
  <header>
    <nav class="container">
	<router-link to="/">記事たち</router-link>
	<router-link to="/DBTutorial">書いたもの</router-link>
      <span class="header__description">

      </span>
    </nav>
  </header>
</template>