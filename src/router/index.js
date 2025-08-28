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
    {
      path: '/sobre',
      name: 'Sobre',
      component: () => import('@/views/AboutPage.vue'),
    },
    {
      path: '/contato',
      name: 'Contato',
      component: () => import('@/views/ContactPage.vue'),
    }
  ],
})

export default router
