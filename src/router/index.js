import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomePage.vue'),
    },
    {
      path: '/pessoas/:id',
      name: 'PessoaDetalhe',
      component: () => import('@/views/PersonDetail.vue'),
      props: true,
    },
  ],
})

export default router
