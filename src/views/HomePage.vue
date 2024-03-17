<script setup>
import { ref } from 'vue'
import ArticleItem from '@/components/ArticleItem.vue'
import { Contentful } from '@/services/contentful'
const articles = ref(null)
fetchData()
async function fetchData() {
  Contentful
    .getEntries({
      content_type: "blog",
      order: '-sys.createdAt',
      limit: 10,
    })
    .then((entries) => {
      console.log(entries)
      articles.value = entries.items
    })
    .catch(console.error)
}
</script>

<template>
  <main>
    <section class="main-content">
      <div class="container">
        <div v-if="articles" class="articles-grid">
          <article-item v-for="(article, index) in articles" :key="index" :article="article"
            :bordered="index !== articles.length - 1" />
        </div>
      </div>
    </section>
  </main>
</template>
