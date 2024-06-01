import { createRouter, createWebHistory } from 'vue-router'
import Pokedex from '@/pages/Pokedex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pokedex',
      component: Pokedex
    },
  ]
})

export default router
