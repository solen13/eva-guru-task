import { createApp } from 'vue';
import './assets/style.css';
import App from './App.vue';
import store from './store';
import router from './router';
import HighchartsVue from 'highcharts-vue';
import VueAwesomePaginate from 'vue-awesome-paginate';
import 'vue-awesome-paginate/dist/style.css';
import { setupRefreshTokenPlugin } from './plugins/refreshToken';

// Token yenileme plugin'ini başlat
setupRefreshTokenPlugin();

const app = createApp(App);

app.use(HighchartsVue);
app.use(VueAwesomePaginate);
app.use(store);
app.use(router);
app.mount('#app');
