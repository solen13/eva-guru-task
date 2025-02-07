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

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); // Örneğin token ile kontrol

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else if (to.path === '/' && isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
