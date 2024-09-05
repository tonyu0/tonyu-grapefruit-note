<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ArticleItem from '@/components/ArticleItem.vue'
import { fetchArticles } from '@/utils/utils'

const articles = ref(null)

const route = useRoute()
const { category, tag } = route.query

const setup = async () => {
	articles.value = await fetchArticles(undefined, category, tag, 100, true)
}
setup()
</script>

<template>
  <div class="container">
    <h1 class="more-articles__title">
      検索結果 (
      <span v-if="category !== undefined">category: {{ category }}</span>
      <span v-if="tag !== undefined">tag: {{ tag }}</span>
      )
    </h1>
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
