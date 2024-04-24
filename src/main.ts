import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'modern-normalize'
import '@/assets/stylesheet/main.css'

createApp(App).use(router).mount('#app')
