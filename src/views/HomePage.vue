<script setup>
import { ref } from 'vue'
import ArticleItem from '@/components/ArticleItem.vue'
import { fetchAllArticles, fetchAllTags } from '@/utils/utils'
const articles = ref(null)
const tags = ref(null)

const setup = async () => {
  articles.value = await fetchAllArticles(10, true)
  tags.value = await fetchAllTags()
}
setup()
</script>

<template>
  <div class="container">
    <div v-if="articles" class="articles-grid">
      <article-item
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
        :bordered="index !== articles.length - 1"
      />
    </div>
  </div>
</template>
