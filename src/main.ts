import { createApp } from 'vue';
import './assets/style.css';
import App from './App.vue';

import HighchartsVue from 'highcharts-vue';

const app = createApp(App);

// HighchartsVue'u Vue uygulamasına dahil et
app.use(HighchartsVue);

// Uygulamayı mount et
app.mount('#app');
