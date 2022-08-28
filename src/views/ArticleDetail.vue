<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { directus } from '@/services/directus'
import { formatRelativeTime } from '@/utils/format-relative-time'
import { getAssetURL } from '@/utils/get-asset-url'
import IconBack from '@/components/icons/BackIcon.vue'
import MoreArticles from '@/components/MoreArticles.vue'
const router = useRouter()
const route = useRoute()
const article = ref(null)
const moreArticles = ref(null)
fetchData()
async function fetchData() {
    const { id } = route.params
    let articleResponse
    try {
        articleResponse = await directus.items('articles').readOne(id, {
            fields: ['*'],
        })
        const formattedArticle = {
            ...articleResponse,
            date_created: formatRelativeTime(new Date(articleResponse.date_created)),
        }
        const moreArticlesResponse = await directus.items('articles').readByQuery({
            fields: ['*'],
            filter: {
                _and: [{ id: { _neq: articleResponse.id } }, { status: { _eq: 'published' } }],
            },
            limit: 2,
        })
        const formattedMoreArticles = moreArticlesResponse.data.map((moreArticle) => {
            return {
                ...moreArticle,
                date_created: formatRelativeTime(new Date(moreArticle.date_created)),
            }
        })
        article.value = formattedArticle
        moreArticles.value = formattedMoreArticles
    } catch (err) {
        console.log(err)
        router.replace({ name: 'not-found', params: { catchAll: route.path } })
    }
}
</script>

<template>
    <div class="current-article">
        <section v-if="article">
            <div class="container">
                <RouterLink to="/" class="current-article__backlink">
                    <IconBack class="icon" />
                    <span>Back to Articles</span>
                </RouterLink>
                <h1 class="current-article__title">
                    {{ article.title }}
                </h1>
                <div class="current-article__detail">
                    <div class="current-article__wrapperOuter">
                        <div class="current-article__wrapperInner">
                            <!-- <div class="current-article__authorImage">
                <img
                  :src="getAssetURL(article.author.avatar)"
                  alt=""
                  loading="lazy"
                />
              </div> -->
                            <div>
                                <!-- <div class="current-article__authorName">
                  {{
                    `${article.author.first_name} ${article.author.last_name}`
                  }}
                </div> -->
                                <div class="current-article__time">
                                    {{ article.date_created }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="current-article_coverImage">
                        <img :src="getAssetURL(article.image)" alt="" />
                    </div>
                </div>
                <div class="current-article__body">
                    <div class="current-article__bodyContent" v-html="article.body" />
                </div>
            </div>
        </section>
        <MoreArticles v-if="moreArticles" :articles="moreArticles" />
    </div>
</template>
