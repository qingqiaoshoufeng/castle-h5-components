import { createApp } from 'vue'
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import Antd from 'vant'
import routes from 'virtual:generated-pages'
import App from './App.vue'
import 'vant/lib/index.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.use(Antd)
app.mount('#app')
