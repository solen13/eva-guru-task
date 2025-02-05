import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/index.vue';
import { useStore } from 'vuex';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Auth kontrolü
router.beforeEach(async (to, from, next) => {
  const store = useStore();
  if (to.meta.requiresAuth && !store.state.auth.accessToken) {
    await store.dispatch('refreshAccessToken');

    if (!store.state.auth.accessToken) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
