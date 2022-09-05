<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav class="container">
      <router-link to="/">
        記事たち
      </router-link>
      <router-link to="/webgl">
        WebGL
      </router-link>
      <span class="header__description" />
    </nav>
  </header>
</template>
