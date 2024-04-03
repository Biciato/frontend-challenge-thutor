import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import money from 'v-money'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { LaFileUploadSolid } from 'oh-vue-icons/icons'

addIcons(LaFileUploadSolid)

const app = createApp(App)
app.use(store)
app.use(router)
app.use(money, { precision: 2 })
app.component('v-icon', OhVueIcon)

app.mount('#app')
