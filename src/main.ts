import { createApp } from 'vue';
import './assets/style.css';
import App from './App.vue';
import store from './store';
import router from './router';
import HighchartsVue from 'highcharts-vue';

const app = createApp(App);

app.use(HighchartsVue);
app.use(store);
app.use(router);
app.mount('#app');
