<script setup>
import { RouterLink } from 'vue-router'

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
  <article class="article" :class="{ bordered }">
    <div class="article__topWrapper">
      <div class="article__imageWrapper">
        <img :src="article.fields.image.fields.file.url" alt="" loading="lazy">
      </div>
      <span aria-hidden="true" class="tag">{{ article.metadata.tags.join('/') }}</span>
    </div>
    <div class="article__bottomWrapper">
      <h1 class="article__title">
        <RouterLink :to="`/articles/${article.fields.slug}`">
          {{ article.fields.title }}
        </RouterLink>
      </h1>
      <div class="article__detail">
        <!-- <div class="article__detailAuthor">
          <img
            :src="getAssetURL(article.author.avatar)"
            alt=""
            loading="lazy"
          />
        </div> -->
        <div class="article__detailInner">
          <!-- <div class="article__detailInnerAuthor">
            {{ `${article.author.first_name} ${article.author.last_name}` }}
          </div> -->
          <div class="article__detailInnerTime">
            {{ article.sys.createdAt }}
          </div>
          <div class="article__detailInnerCategory">
            {{ article.fields.body }}
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
