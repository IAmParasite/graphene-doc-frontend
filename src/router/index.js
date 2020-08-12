import Vue from 'vue'
import VueRouter from 'vue-router'
import loginView from '../views/loginView.vue'
import Home from '../views/Home.vue'
import ElementUI from 'element-ui';
import {Message} from 'element-ui'
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
    path: '/docs/:id',
    name: 'Docs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/docs/Docs.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
