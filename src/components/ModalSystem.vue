<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface ModalImage {
	id: number
	src: string
}

interface ModalImages {
	images: Array<ModalImage>
}

const emit = defineEmits(['closeModal'])

const props = withDefaults(defineProps<ModalImages>(), {
	images: () => [{ id: 0, src: '' }],
})

const isVisible = ref(true)
const selectedimageID = ref(0)
const imageHeight = ref(0)
const isImageLoaded = ref(false)
const transitionName = ref('') // prev or next, paging animation name
const currentImage = computed(() => {
	return props.images.find((res) => {
		return res.id === selectedimageID.value
	})
})

const currentImageIndex = computed(() => {
	// "Index" is arrays index
	return props.images.findIndex((res) => {
		return res.id === selectedimageID.value
	})
})

const prevImage = computed(() => {
	const prevImageIndex = (currentImageIndex.value - 1 + props.images.length) % props.images.length
	return props.images[prevImageIndex]
})

const nextImage = computed(() => {
	const nextimageIndex = (currentImageIndex.value + 1) % props.images.length
	return props.images[nextimageIndex]
})

watch(selectedimageID, () => {
	isImageLoaded.value = false
})

// function openModal(thumb: ModalImage) {
//     isVisible.value = true
//     selectedimageID.value = thumb.id
// }

function closeModal() {
	// isVisible.value = false
	// selectedimageID.value = -1
	emit('closeModal')
}

function onClickPrev() {
	selectedimageID.value = prevImage.value.id
}

function onClickNext() {
	selectedimageID.value = nextImage.value.id
}

function onLoadModal(event: Event) {
	const img = event.target as HTMLImageElement
	imageHeight.value = Math.min(300, img.naturalHeight)
	isImageLoaded.value = true
}

function onClickPager(id: number) {
	transitionName.value = selectedimageID.value < id ? 'next' : 'prev' // if change transition depend on which button pressed
	selectedimageID.value = id
}
</script>

<template>
  <Transition>
    <!-- all modal animation -->
    <div v-show="isVisible" class="modal-container">
      <div class="modal-overlay" @click.self="closeModal">
        <!--.self: stop propagate -->
        <div v-if="currentImage" class="modal-body">
          <div class="modal-image-container" :class="{ isLoaded: isImageLoaded }">
            <Transition mode="out-in" name="image">
              <div :key="currentImage.id">
                <img :src="currentImage.src" alt="" class="modal-image" @load.prevent.stop="onLoadModal">
              </div>
            </Transition>
          </div>
        </div>
        <button class="button modalButton modalButton__prev" @click="onClickPrev">
          PREV
        </button>
        <button class="button modalButton modalButton__next" @click="onClickNext">
          NEXT
        </button>
        <ol class="carousel-pager">
          <li v-for="(image, id) in images" :key="image.id">
            <button tabindex="0" :class="{ 'is-current': id == selectedimageID }" @click="onClickPager(id)" />
          </li>
        </ol>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-container {
	position: relative;
	z-index: 9998;
	width: 100%;
	height: 100%;
}

.modal-body {
	position: relative;
	/* z-index: 9999; */
	box-sizing: border-box;
	width: 100%;
	/* max-width: 640px; */
	padding: 16px;
	margin: auto;
	background-color: #fff;
}

.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	overflow: auto;
	width: 100%;
	height: 100%;
	padding: 20px 60px;
	background-color: rgba(0, 0, 0, 0.7);
}

.modal-image-container {
	display: flex;
	justify-content: center;
	/* position: relative; */
	background-color: #f0f0f0;
}

.modal-image-container > div {
	/* min-height: 200px; */
	transition: height 0.3s ease;
	/* slower switch animation than default */
}

.modal-image-container img {
	width: auto;
	/* max-height: 100%; */
	transition: opacity 0.4s linear;
	/* for image gradually disappear animation */
	opacity: 0;
}

/* image loading cycle animation */
.modal-image-container::before {
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: block;
	width: 30px;
	height: 30px;
	margin: auto;
	border: 4px solid #000;
	border-top-color: #a0a0a0;
	border-radius: 999em;
	animation: loop 0.7s linear 0s infinite normal forwards;
}

.modal-image-container.isLoaded img {
	opacity: 1;
}

.modal-image-container.isLoaded::before {
	content: none;
}

@keyframes loop {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}

.modalButton {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
}

.modalButton__prev {
	left: 10vw;
	transform: translateX(-50%);
}

.modalButton__next {
	right: 10vw;
	transform: translateX(50%);
}

/* サムネイルリストのスタイリング
  ================================*/
.imageList {
	display: flex;
	padding: 0;
	list-style: none;
	justify-content: center;
}

.imageList .imageList-item {
	width: 100px;
	margin-right: 20px;
}

.imageList .imageList-item:last-child {
	margin-right: 0;
}

.imageList .imageList-button {
	padding: 0;
	border: none;
}

.imageList .imageList-thumb {
	width: 100%;
	cursor: pointer;
}

.is-current {
	background-color: #280071;
}
</style>
