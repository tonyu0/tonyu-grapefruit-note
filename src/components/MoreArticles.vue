<script setup>
import ArticleItem from '@/components/ArticleItem.vue'
defineProps({
	articles: {
		type: Array,
		required: true,
	},
})
</script>

<template>
	<section class="more-articles">
		<div class="container">
			<h1 class="more-articles__title">関連記事</h1>
			<div class="articles-grid">
				<div v-if="articles.length > 0">
					<article-item
						v-for="(article, index) in articles"
						:key="index"
						:article="article"
						:bordered="index !== articles.length - 1"
					/>
				</div>
				<div v-else>関連記事が見つかりません</div>
			</div>
		</div>
	</section>
</template>
