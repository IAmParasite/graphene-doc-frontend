import Vue from 'vue'
import VueRouter from 'vue-router'

import loginView from '../views/loginView.vue'
import Home from '../views/Home.vue'
import Personal from '../views/Personal.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/team',
        component: () => import('../components/menu/Team.vue')
      },
      {
        path: '/help',
        component: () => import('../components/menu/Help.vue')
      },
      {
        path: '/recent-docs',
        component: () => import('../components/menu/RecentDocs.vue')
      },
      {
        path: '/enshrine-docs',
        component: () => import('../components/menu/EnshrineDocs.vue')
      },
      {
        path: '/own-docs',
        component: () => import('../components/menu/OwnDocs.vue')
      },
      {
        path: '/teams-mem',
        component: () => import('../components/menu/TeamsMem.vue')
      },
      {
        path: '/dustbin',
        component: () => import('../components/menu/Dustbin.vue')
      },
    ]
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
