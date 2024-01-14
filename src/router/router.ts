import { createRouter, createWebHistory } from 'vue-router'
import LoggedInView from '@/views/LoggedIn.vue'
import { store } from '@/stores/store'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { requiresAuth: true },
    component: LoggedInView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = store()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) next('/login')
  else if (authStore.isLoggedIn && to.path === '/login') next('/')
  else next()
})

export default router
