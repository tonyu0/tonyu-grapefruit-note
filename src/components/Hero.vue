<script setup>
import { RouterLink } from "vue-router";
import { getAssetURL } from "@/utils/get-asset-url";

defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article class="hero">
    <div class="hero__topWrapper">
      <div class="hero__imageWrapper">
        <img :src="getAssetURL(article.image)" alt="" loading="lazy" />
      </div>
      <span aria-hidden="true" class="tag">{{article.body}}</span>
    </div>
    <h1 class="hero__title">
      <RouterLink :to="`/articles/${article.id}`">
        {{ article.title }}
      </RouterLink>
    </h1>
    <!-- <p class="hero__excerpt">{{ article.excerpt }}</p> -->
    <div class="hero__detail">
      <!-- <div class="hero__detailAuthorImage">
        <img :src="getAssetURL(article.author.avatar)" alt="" loading="lazy" />
      </div> -->
      <div>
        <!-- <div class="hero__detailAuthorName">
          {{ `${article.author.first_name} ${article.author.last_name}` }}
        </div> -->
        <div>{{ article.date_created }}</div>
        <div class="hero__detailCategory">{{article.body}}</div>
      </div>
    </div>
  </article>
</template>