<script setup>
import { ref, onUpdated } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { formatDate } from '@/utils/utils'
import IconBack from '@/components/icons/BackIcon.vue'
import { fetchArticles } from '@/utils/utils'
import MoreArticles from '@/components/MoreArticles.vue'
import ArticleDetailTOC from '@/components/ArticleDetailTOC.vue'
// Contentful
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

const route = useRoute()
const article = ref(null)
const moreArticles = ref([])
const { id, category } = route.params
const articleHTML = ref(null)
const articleNotFound = ref(false)

const loadArticle = async () => {
	const res = await fetchArticles(undefined, category, undefined, 7, true) // this article + more article x 6
	for (const r of res) {
		if (r.fields.slug == id) {
			article.value = r
		} else {
			moreArticles.value.push(r)
		}
	}
	if (article.value !== null) {
		let s = documentToHtmlString(article.value.fields.body)

		// TODO: toc-index for ArticleDetailTOC.vue, inefficient way to insert id, should improve
		let tocCnt = 0
		for (let i = 0; i < s.length - 1; ++i) {
			if (s.substring(i, i + 3) === '<h1') {
				++tocCnt
			}
		}
		for (let i = s.length - 2; i >= 0; --i) {
			if (s.substring(i, i + 3) === '<h1') {
				s = s.slice(0, i + 3) + (" id='toc-" + tocCnt.toString() + "'") + s.slice(i + 3)
				--tocCnt
			}
		}
		articleHTML.value = s
	} else {
		articleNotFound.value = true
	}
}
loadArticle()

function scrollToAnchor() {
	if (route.hash) {
		const el = document.getElementById(route.hash.substring(1))
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' })
		}
	}
}

onUpdated(() => {
	// jump to each heading using dynamically generated id
	// ref: https://blog.kurodigi.com/posts/vue3-dynamic-anchor-link
	scrollToAnchor()

	// if(articleNotFound.value){
	//   const router = useRouter()
	//   router.replace({ name: 'not-found', params: { catchAll: route.path } }) // to NotFound.vue
	// }
	// -> just use v-if
})
</script>
<template>
  <div class="current-article">
    <article class="container">
      <RouterLink to="/" class="current-article__backlink">
        <IconBack class="icon" />
        <span>Back</span>
      </RouterLink>
      <div v-if="article">
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
        <ArticleDetailTOC :article-content="article.fields.body.content" />
        <!-- eslint-disable vue/no-v-html -->
        <div class="current-article__body" v-html="articleHTML" />
        <!-- eslint-enable -->

        <hr>
        <MoreArticles :articles="moreArticles" />
      </div>
      <div v-if="articleNotFound">
        Article Not Found
      </div>
    </article>
  </div>
</template>
