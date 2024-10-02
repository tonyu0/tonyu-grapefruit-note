<script setup>
import { ref, onUpdated } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { formatDate } from '@/utils/utils'
import IconBack from '@/components/icons/BackIcon.vue'
import { fetchArticles } from '@/utils/utils'
import MoreArticles from '@/components/MoreArticles.vue'
import ArticleDetailTOC from '@/components/ArticleDetailTOC.vue'

import { showdown } from 'vue-showdown'
import ModalSystem from '@/components/ModalSystem.vue'

const route = useRoute()
const article = ref(null)
const moreArticles = ref([])
const { id, category } = route.params
const articleHTML = ref(null)
const articleNotFound = ref(false)
const articleImages = ref([])
const isImageModalVisible = ref(false)

const loadArticle = async () => {
	const res = await fetchArticles(undefined, category, undefined, 7, true) // this article + more article x 6
	for (const r of res) {
		if (r.fields.slug == id) {
			article.value = r
		} else {
			moreArticles.value.push(r)
		}
	}
	if (article.value) {
		const converter = new showdown.Converter()
		articleHTML.value = converter.makeHtml(article.value.fields.body)
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
	// TODO: モーダル表示時のonUpdated()でTOCに飛んでしまう。isImageModalVisible==trueのときにscrollToAnchor()ふさいでもモーダル解除時にも飛んでしまう

	// if(articleNotFound.value){
	//   const router = useRouter()
	//   router.replace({ name: 'not-found', params: { catchAll: route.path } }) // to NotFound.vue
	// }
	// -> just use v-if

	// load images of article detail
	if (articleImages.value.length == 0) {
		// onUpdated() is called every time modal become visible, so need the condition not to collect image multiple times
		const domParser = new DOMParser()
		const contentHTML = domParser.parseFromString(articleHTML.value, 'text/html')
		let idx = -1
		contentHTML.querySelectorAll('img').forEach((node) => {
			idx += 1
			articleImages.value.push({ id: idx, src: node.getAttribute('src') })
			// TODO: 画像クリックでモーダル起動できるように 後付けでクリックイベント起こせるか？
			// TODO: クリックした画像からモーダル始まるように。モーダルへインデックスprops
		})
	}
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
        <ArticleDetailTOC :article-content="articleHTML" />
        <ModalSystem v-show="isImageModalVisible" :images="articleImages" @close-modal="isImageModalVisible = false" />
        <button v-show="articleImages.length > 0" class="m-5" @click="isImageModalVisible = !isImageModalVisible">
          記事の画像一覧を表示
        </button>
        <!-- eslint-disable vue/no-v-html -->
        <vue-showdown :markdown="articleHTML" class="current-article__body" />
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
