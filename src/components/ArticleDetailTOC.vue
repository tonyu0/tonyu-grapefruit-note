<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'

interface ArticleDetailTOCProps {
	articleContent: string
}

interface TOCElement {
	tagName: string
	textContent: string
}

const props = withDefaults(defineProps<ArticleDetailTOCProps>(), {
	articleContent: '',
})

const TOCs = ref([] as TOCElement[])
const showTOCs = ref(true)
const router = useRouter()
const route = useRoute()

const domParser = new DOMParser()
const contentHTML = domParser.parseFromString(props.articleContent, 'text/html')
contentHTML.querySelectorAll('h1, h2').forEach((node) => {
	if (node.textContent) {
		TOCs.value.push({ tagName: node.tagName, textContent: node.textContent.replace(/ /g, '-') })
	}
})
function scrollTo(to: string) {
	if (to === route.hash) {
		router.go(0)
		// if hash is not changed,
		// scroll-margin-top setting is somehow ignored, so force reload
	}
}
</script>

<template>
  <div class="toc">
    <div class="toc-content">
      <label class="toc-title" @click.prevent="showTOCs = !showTOCs">目次 {{ showTOCs ? '[閉じる]' : '[開く]' }}</label>
      <transition-group>
        <!-- maybe toggle at @after-leave is good-->
        <ul v-if="showTOCs">
          <li v-for="(TOC, idx) in TOCs" :key="idx" class="toc-list" :class="TOC.tagName">
            <RouterLink :to="`#${TOC.textContent}`" @click="scrollTo('#' + TOC.textContent)">
              {{ TOC.textContent }}
            </RouterLink>
          </li>
        </ul>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.toc {
	margin: 30px 33%;
	background-color: #e9e0f8 /* var(--background-accent-50) */;
}

.toc-content {
	padding: 10px; /* .toc(base) 10% */
}

.toc-content .H1 {
	margin: 1.6rem;
	line-height: 20px;
	font-size: 20px;
	list-style: square;
}

.toc-content .H2 {
	margin: 1.6rem;
	line-height: 20px;
	font-size: 20px;
	list-style: square;
	list-style-position: inside;
}

.toc-title {
	display: block;
	/* font-size: 20px; */
	font-weight: bold;
	border-bottom: solid 1px #280071 /* var(--background-accent-10) */;
	margin-bottom: 10px;
	cursor: pointer;
	text-align: center;
}
</style>
