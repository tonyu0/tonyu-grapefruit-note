<script setup>
import IconGithub from './icons/GithubIcon.vue'
import IconYoutube from './icons/YoutubeIcon.vue'
import IconLinkedin from './icons/LinkedinIcon.vue'
import IconTwitter from './icons/TwitterIcon.vue'
</script>

<template>
  <footer>
    <div class="container footer__bottomWrapper">
      <span class="footer__copyright">© {{ new Date().getFullYear() }} <span class="underline">copy right</span></span>
      <ul class="footer__socials">
        <li>
          <a href="https://github.com/tonyu0" class="logo" target="_blank" rel="noreferrer noopener">
            <IconGithub />
          </a>
        </li>
        <li>
          <a class="logo" target="_blank" rel="noreferrer noopener">
            <IconYoutube />
          </a>
        </li>
        <li>
          <a class="logo" target="_blank" rel="noreferrer noopener">
            <IconLinkedin />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/tonyu09" class="logo" target="_blank" rel="noreferrer noopener">
            <IconTwitter />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
