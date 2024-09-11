
<script setup>
import {ref} from 'vue'

const isVisible = ref(false)
const selectedThumbnailID = ref(undefined)
const thumbnailHeight = ref(null)
const isThumbnailLoaded = ref(false)
// thumbnails : from parent?
// currentThumnail: change by selectedThumbnailID


// function openModal(thumb) {
//     isVisible.value = true
//     selectedThumbnailID.value = thumb.id
// }

function closeModal() {
    isVisible.value = false
    selectedThumbnailID.value = undefined
}

function onLoadModal(event) {
    thumbnailHeight.value = event.target.naturalHeight
    isThumbnailLoaded.value = true
}

</script>

<template>
  <div v-show="isVisible" class="modal-container">
    <div class="modal-overlay" @click.self="closeModal">
      <!--.self: stop propagate -->
      <div v-if="currentThumbnail" class="modal-body">
        <div :style="containerStyle">
          <img :src="currentThumbnail.src" alt="" class="modal-image" @load.prevent.stop="onLoadModal">
        </div>
      </div>
      <p>
        <button class="button button--close" @click="closeModal">
          Close
        </button>
      </p>
    </div>
  </div>
</template>