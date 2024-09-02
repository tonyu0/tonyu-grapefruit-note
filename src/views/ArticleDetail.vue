<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { formatDate } from '@/utils/utils'
import IconBack from '@/components/icons/BackIcon.vue'
import MoreArticles from '@/components/MoreArticles.vue'
// Contentful
import { Contentful } from '@/services/contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

const router = useRouter()
const route = useRoute()
const article = ref(null)
const moreArticles = ref(null)
fetchData()
async function fetchData() {
	const { id } = route.params
	try {
		const entries = await Contentful.getEntries({
			content_type: 'blog',
			'fields.slug': id,
		}).catch((error) => console.log(error))
		article.value = entries.items[0]
	} catch (err) {
		console.log(err)
		router.replace({ name: 'not-found', params: { catchAll: route.path } })
	}
}
const getPostHtml = (str) => {
	return documentToHtmlString(str)
}
</script>
<template>
  <div class="current-article">
    <section v-if="article">
      <div class="container">
        <RouterLink
          to="/"
          class="current-article__backlink"
        >
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
                <font-awesome-icon
                  :icon="['fa', 'fa-history']"
                  aria-hidden="true"
                />
                <time>{{ formatDate(new Date(article.sys.createdAt)) }}</time>
              </span>
              <span class="article-date">
                <font-awesome-icon
                  :icon="['far', 'fa-clock']"
                  aria-hidden="true"
                />
                <time>{{ formatDate(new Date(article.sys.updatedAt)) }}</time>
              </span>

              <span
                v-for="tag in article.metadata.tags"
                :key="tag.sys.id"
                class="tag"
              >
                <font-awesome-icon
                  :icon="['fa', 'fa-tag']"
                  aria-hidden="true"
                />
                {{ tag.sys.id }}</span>
            </div>
          </div>
          <!-- <div class="current-article_coverImage">
            <img
              :src="article.fields.image.fields.file.url"
              alt=""
            >
          </div> -->
        </div>
        <div class="current-article__body">
          <div
            class="current-article__bodyContent"
            v-html="getPostHtml(article.fields.body)"
          />
        </div>
      </div>
    </section>
    <section v-else>
      記事が見つかりません
    </section>

    <MoreArticles
      v-if="moreArticles"
      :articles="moreArticles"
    />
  </div>
</template>
