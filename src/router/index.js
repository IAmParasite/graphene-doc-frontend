import Vue from 'vue'
import VueRouter from 'vue-router'

import loginView from '../views/loginView.vue'
import Home from '../views/Home.vue'
import Personal from '../views/Personal.vue'
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/loginView',
    name: 'loginView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: loginView
  },

  {
    path: '/Personal',
    name: 'Personal',
    component: Personal
<<<<<<< Updated upstream
  }
=======
  },
  {
    path: '/docs/:id',
    name: 'Docs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/docs/Docs.vue')
  },
  
>>>>>>> Stashed changes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
