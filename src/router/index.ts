import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/models'
    },
    {
      path: '/models',
      name: 'models',
      component: () => import('@/views/Models.vue')
    }
  ]
})

export default router
