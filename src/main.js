import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// import './plugins/http.js'
import axios from 'axios'

// axios请求地址
axios.defaults.baseURL = 'http://180.76.187.248:3000/api/v1'

const app = createApp(App).use(ElementPlus)
app.config.globalProperties.$http = axios
app.mount('#app')