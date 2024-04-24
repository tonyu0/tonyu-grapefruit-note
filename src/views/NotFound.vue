<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="error">
    <section>
      <h1>page not found</h1>
      <p>
        <RouterLink to="/">
          Back to Top
        </RouterLink>
      </p>
    </section>
  </main>
</template>
