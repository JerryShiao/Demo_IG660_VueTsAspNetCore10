import './assets/main.css'
import { createApp } from 'vue';
import App from './App.vue';

// 引入 vue-loading-overlay 的全域物件
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App);
app.mount('#app');
