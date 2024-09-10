<script setup>
import { ref } from 'vue'

const isShown = ref(false)

defineProps({
	title: {
		type: String,
		required: true,
	},
})

function nextFrame(cb) {
	window.requestAnimationFrame(function () {
		window.requestAnimationFrame(cb)
	})
}

function enter(el) {
	el.style.overflow = 'hidden' // not to show content while transition
	const height = el.scrollHeight
	el.style.height = '0'

	nextFrame(function () {
		// animation from height=0 to height=height
		el.style.height = height + 'px'
	})
}

function leave(el) {
	el.style.overflow = 'hidden'
	el.style.height = el.scrollHeight + 'px'

	nextFrame(function () {
		el.style.height = '0'
	})
}

function afterTransition(el) {
	el.style.overflow = ''
	el.style.height = ''
}
</script>

<template>
  <dl class="accordion">
    <dt :class="{ is_open: isShown }" role="button" @click="isShown = !isShown">
      {{ title }}
    </dt>
    <transition @enter="enter" @after-enter="afterTransition" @leave="leave" @after-leave="afterTransition">
      <dd v-show="isShown" class="accordion-body">
        <div class="accordion-txt">
          <slot />
        </div>
      </dd>
    </transition>
  </dl>
</template>

<style scoped>
dt {
	margin: 20px;
}

.is_open {
	background-color: #bbb;

	&:after {
		transform: rotateX(180deg);
		margin-top: -10px;
	}
}
</style>
