import { createRouter, createWebHistory } from 'vue-router'
import Pokedex from '@/pages/Pokedex.vue'
import Party from '@/pages/Party.vue'
import Pokemon from '@/pages/Pokemon.vue'
import Trainer from '@/pages/Trainer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pokedex',
      component: Pokedex
    },
    {
      path: '/party',
      name: 'party',
      component: Party
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      component: Pokemon,
      beforeEnter: (to, from, next) => {
        const id = Number(to.params.id);
        if (!isNaN(id) && id > 0 && id <= 151) {
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/trainer',
      name: 'trainer',
      component: Trainer
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
