<script setup>
import IconGithub from './icons/GithubIcon.vue'
import IconYoutube from './icons/YoutubeIcon.vue'
import IconLinkedin from './icons/LinkedinIcon.vue'
import IconTwitter from './icons/TwitterIcon.vue'
</script>

<template>
    <footer>
        <div class="container footer__topWrapper">何か</div>
        <div class="container footer__bottomWrapper">
            <span class="footer__copyright"
                >© {{ new Date().getFullYear() }} <span class="underline">copy right</span></span
            >
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
