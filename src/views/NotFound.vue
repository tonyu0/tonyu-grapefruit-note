<script setup>
import { RouterLink } from 'vue-router'
import IconBack from '@/components/icons/BackIcon.vue'
</script>

<template>
  <div class="current-article">
    <article
      class="container"
    >
      <RouterLink
        to="/"
        class="current-article__backlink"
      >
        <IconBack class="icon" />
        <span>
          Back to Top
        </span>
      </RouterLink>
      <h1>Page Not Found</h1>
    </article>
  </div>
</template>
