<script setup>
import { ref } from 'vue'
import { directus } from '@/services/directus'
import ArticleItem from '@/components/ArticleItem.vue'
const articles = ref(null)
fetchData()
async function fetchData() {
    const response = await directus.items('articles').readByQuery({
        //     fields: ["*", "author.avatar", "author.first_name", "author.last_name"],
        fields: ['*'],
        //     sort: "-date_created",
    })
    const formattedArticles = response.data.map((article) => {
        return {
            ...article,
            //       date_created: formatRelativeTime(new Date(article.date_created)),
        }
    })
    // const [first, ...rest] = formattedArticles
    // hero.value = first
    articles.value = formattedArticles
}
</script>

<template>
    <main>
        <section class="main-content">
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
        </section>
    </main>
</template>
