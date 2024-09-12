<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ArticleItem from '@/components/ArticleItem.vue'
import { fetchArticles } from '@/utils/utils'

const articles = ref(null)
const filterText = ref('')
// TODO: const filterMode = ref("") // tags / categories / title / content ?
// enumerate them with <ul>
// tags: from fetchAllTags, and select

const route = useRoute()
const { category, tag } = route.query
const filteredArticles = computed(() => {
	// articles.value.filter((article) => {return article.content.indexOf(filterText.value) !== -1})
	return articles.value
})
const setup = async () => {
	articles.value = await fetchArticles(undefined, category, tag, 100, true)
}
setup()
</script>

<template>
  <div class="container">
    <div class="mb-6">
      <label for="filter">検索ワード</label>
      <input v-model.trim="filterText" name="filter" placeholder="検索...">
      <p>[{{ filterText }}] で検索 (未実装)</p>
    </div>
    <h1 class="more-articles__title">
      検索結果 (
      <span v-if="category">category: {{ category }}</span>
      <span v-if="tag">tag: {{ tag }}</span>
      )
    </h1>
    <div v-if="filteredArticles" class="articles-grid">
      <article-item
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
        :bordered="index !== articles.length - 1"
      />
    </div>
  </div>
</template>
