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
    meta: { title: "个人中心" },
    children: [
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
        path: '/teams-list/:id',
        component: () => import('../components/menu/TeamsList.vue')
      },
      {
        path: '/dustbin',
        component: () => import('../components/menu/Dustbin.vue')
      },
      {
        path: '/teamdocs-list/:id',
        component: () => import('../components/team/groupdocs.vue')
      },
      {
        path: '/my-cor-docs',
        component: () => import('../components/menu/CorporateDocs.vue')
      }
    ]
  },
  {
    path: '/loginView',
    name: 'loginView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: loginView,
    meta: { title: "登录" },
  },
  {
    path: '/Personal',
    name: 'Personal',
    component: Personal
  },
  {
    path: '/docs/:id',
    name: 'Docs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/docs/Docs.vue')
  },
  {
    path: '/docs2/:id',
    name: 'Docs2',
    component: () => import('../components/docs/Docs2.vue')
  },
  {
    path: '/notice',
    name: 'NoticeIndex',
    component: () => import('../components/notice/NoticeIndex.vue'),
    children: [
      {
        path: '/invitation',
        component: () => import('../components/notice/Invitation.vue')
      },
      {
        path: '/application',
        component: () => import('../components/notice/Application.vue')
      },
      {
        path: '/private-message',
        component: () => import('../components/notice/PrivateMessage.vue')
      },
      {
        path: '/notice',
        component: () => import('../components/notice/Notice.vue')
      }
    ]
  },
  {
    path: '/userInfo/:username',
    name: 'userInfo',
    component: () => import('../components/userInfo.vue')
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
