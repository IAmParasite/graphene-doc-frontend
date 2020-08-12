import Vue from 'vue'
import VueRouter from 'vue-router'

import Notifications from 'vue-notification'
import loginView from '../views/loginView.vue'
import Home from '../views/Home.vue'
import ElementUI from 'element-ui';
import {Message} from 'element-ui'
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.component(Message)
Vue.use(Notifications)
Vue.prototype.$message = Message
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  //to到哪儿  from从哪儿离开  next跳转 为空就是放行  
    if (to.path === '/loginView') {
      //如果跳转为登录，就放行 
      next();
    } else {
    //取出localStorage判断
          let token = localStorage.getItem('token');      	     
          if (token == null || token === '') { 
                 console.log('请先登录3')    
                 console.log(to.path)
                 alert("请先登录！")
                 //next({name:'loginView'});
             } else {
                    next();   
             }   
  }});
export default router
