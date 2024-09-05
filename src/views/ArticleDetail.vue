<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { formatDate } from '@/utils/utils'
import IconBack from '@/components/icons/BackIcon.vue'
import { fetchArticles } from '@/utils/utils'
import MoreArticles from '@/components/MoreArticles.vue'
// Contentful
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

const route = useRoute()
const article = ref(null)
const moreArticles = ref([])
const { id, category } = route.params

const setup = async () => {
	const res = await fetchArticles(undefined, category, undefined, 7, true) // this article + more article x 6
	for (const r of res) {
		if (r.fields.slug == id) {
			article.value = r
		} else {
			moreArticles.value.push(r)
		}
	}
}
setup()
if (article.value === undefined) {
	const router = useRouter()
	router.replace({ name: 'not-found', params: { catchAll: route.path } }) // to NotFound.vue
}
</script>
<template>
  <div class="current-article">
    <article v-if="article" class="container">
      <RouterLink to="/" class="current-article__backlink">
        <IconBack class="icon" />
        <span>Back</span>
      </RouterLink>
      <h1 class="current-article__title">
        {{ article.fields.title }}
      </h1>
      <div class="current-article__detail">
        <div class="current-article__wrapperOuter">
          <!-- <div class="current-article__authorImage">
                <img
                  :src="getAssetURL(article.author.avatar)"
                  alt=""
                  loading="lazy"
                />
              </div> -->
          <!-- <div class="current-article__authorName">
                  {{
                    `${article.author.first_name} ${article.author.last_name}`
                  }}
                </div> -->
          <div class="current-article__time">
            <span class="article-date">
              <font-awesome-icon :icon="['fa', 'fa-history']" aria-hidden="true" />
              <time>{{ formatDate(new Date(article.sys.createdAt)) }}</time>
            </span>
            <span class="article-date">
              <font-awesome-icon :icon="['far', 'fa-clock']" aria-hidden="true" />
              <time>{{ formatDate(new Date(article.sys.updatedAt)) }}</time>
            </span>
            <!-- below exactly same code is used on ArticleItem.vue, if seems it will be used more places, think componentization -->
            <span class="tag">
              <RouterLink :to="{ name: 'search-result', query: { category: `${article.sys.contentType.sys.id}` } }">
                <font-awesome-icon :icon="['fa', 'fa-list']" aria-hidden="true" />
                {{ article.sys.contentType.sys.id }}
              </RouterLink>
            </span>

            <span v-for="tag in article.metadata.tags" :key="tag.sys.id" class="tag">
              <RouterLink :to="{ name: 'search-result', query: { tag: `${tag.sys.id}` } }">
                <font-awesome-icon :icon="['fa', 'fa-tag']" aria-hidden="true" />
                {{ tag.sys.id }}
              </RouterLink>
            </span>
          </div>
        </div>
        <!-- <div class="current-article_coverImage">
            <img
              :src="article.fields.image.fields.file.url"
              alt=""
            >
          </div> -->
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div class="current-article__body" v-html="documentToHtmlString(article.fields.body)" />
      <!-- eslint-enable -->

      <hr>
      <MoreArticles :articles="moreArticles" />
    </article>
  </div>
</template>
