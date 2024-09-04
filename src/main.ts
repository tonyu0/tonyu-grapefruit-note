import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'modern-normalize'
import '@/assets/stylesheet/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faHistory, faTag, faList } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faHistory)
library.add(faTag)
library.add(faClock)
library.add(faList)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
