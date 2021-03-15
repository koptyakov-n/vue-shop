import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'main',
    },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      layout: 'main',
    },
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/category/:id',
    name: 'category',
    meta: {
      layout: 'main',
    },
    component: () => import('@/views/Category.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
