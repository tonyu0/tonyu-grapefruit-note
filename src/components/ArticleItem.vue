<script setup>
import { RouterLink } from 'vue-router'
import { formatDate } from '@/utils/utils'

defineProps({
	article: {
		type: Object,
		required: true,
	},
	bordered: {
		type: Boolean,
		required: true,
	},
})
</script>

<template>
  <article
    class="article"
    :class="{ bordered }"
  >
    <RouterLink :to="`/articles/${article.fields.slug}`">
      <div class="article__topWrapper">
        <div class="article__imageWrapper">
          <img
            v-if="'image' in article.fields"
            :src="article.fields.image.fields.file.url"
            alt=""
            loading="lazy"
          >
        </div>
      </div>
      <div class="article__bottomWrapper">
        <h1 class="article__title">
          {{ article.fields.title }}
        </h1>
        <div class="article__detail">
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
          <div class="article__detailInnerAuthor">
            {{ `${article.author == null ? '' : article.author}` /* TODO: author name */ }}
          </div>
        </div>
      </div>
    </RouterLink>
  </article>
</template>
