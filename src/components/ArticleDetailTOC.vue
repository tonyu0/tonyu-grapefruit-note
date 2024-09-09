<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

interface ArticleDetailTOCProps {
	articleContent: []
}

const props = withDefaults(defineProps<ArticleDetailTOCProps>(), {
	articleContent: () => {
		return []
	},
})

const heading1s = ref([])
const showTOC = ref(true)
for (const ac of props.articleContent) {
	if (ac['nodeType'] === 'heading-1') {
		heading1s.value.push(ac['content'][0]['value'])
	}
	console.log(ac)
	// how to fetch image
	// if ac['noteTYpe'] === 'embedded-asset-block'
	// then ac['data'].target.fields.file
	// then check contentTYpe === "image/jpeg"
	// then check url, show image
}
</script>

<template>
  <div class="toc">
    <div class="toc-content">
      <label class="toc-title" @click.prevent="showTOC = !showTOC">目次</label>
      <ul v-if="showTOC">
        <li v-for="(heading1, idx) in heading1s" :key="idx" class="toc-list">
          <RouterLink :to="`#toc-${idx + 1}`">
            {{ idx + 1 }}. {{ heading1 }}
          </RouterLink>
        </li>
      </ul>
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

.toc-title {
	display: block;
	font-size: 20px;
	font-weight: bold;
	border-bottom: solid 1px #280071 /* var(--background-accent-10) */;
	margin-bottom: 10px;
	cursor: pointer;
	text-align: center;
}
</style>
