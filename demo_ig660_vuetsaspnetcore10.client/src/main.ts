import './assets/main.css'
import { createApp } from 'vue';
import App from './App.vue';

// 引入 vue-loading-overlay 的全域物件
import 'vue-loading-overlay/dist/css/index.css';

// 引入 PrimeVue 與 主題設定
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

const app = createApp(App);

// 註冊 PrimeVue，並套用 Aura 主題
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark' // 支援暗黑模式切換
    }
  }
})

app.mount('#app');
