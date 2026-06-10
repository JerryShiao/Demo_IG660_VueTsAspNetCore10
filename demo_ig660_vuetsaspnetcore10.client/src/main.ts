import './assets/main.css'
import { createApp } from 'vue';
import App from './App.vue';
import Swal from 'sweetalert2'

// 引入 vue-loading-overlay 的全域物件
import 'vue-loading-overlay/dist/css/index.css';

// 引入 PrimeIcons 圖示字體
import 'primeicons/primeicons.css';

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

// 設定 Swal 全局預設配置
const swalMixin = Swal.mixin({
  allowOutsideClick: false,
  allowEscapeKey: true,
  didOpen: (modal) => {
    const swalContainer = modal.closest('.swal2-container');
    if (swalContainer) {
      (swalContainer as HTMLElement).style.zIndex = '999999';
    }
  },
  customClass: {
    container: 'swal-container-top'
  }
})

// 將 Swal 實例掛載到全局屬性（可選）
app.config.globalProperties.$swal = swalMixin

app.mount('#app');
