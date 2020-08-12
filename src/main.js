import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/icon/iconfont.css';
import 'ant-design-vue/dist/antd.css'; 
import { Button, notification } from 'ant-design-vue';
import { Card } from 'ant-design-vue';
import { Col } from 'ant-design-vue';
import { Row } from 'ant-design-vue';
import { Icon } from 'ant-design-vue';
import { Layout } from 'ant-design-vue';
import { Input } from 'ant-design-vue';
import { Tabs } from 'ant-design-vue';
import { Form } from 'ant-design-vue';
import { FormModel } from 'ant-design-vue';
import { Menu } from 'ant-design-vue';
import { Breadcrumb } from 'ant-design-vue';
import { Dropdown } from 'ant-design-vue';
import { Badge } from 'ant-design-vue';
import { Avatar } from 'ant-design-vue';
import { ConfigProvider } from 'ant-design-vue';
import { List } from 'ant-design-vue';
import { Empty } from 'ant-design-vue';
import { Popover } from 'ant-design-vue'
import { Alert } from 'ant-design-vue';
import Axios from 'axios'

Vue.use(Button);
Vue.use(Input);
Vue.use(Layout);
Vue.use(Card);
Vue.use(Layout);
Vue.use(Col);
Vue.use(Row);
Vue.use(Icon);
Vue.use(Tabs);
Vue.use(Form);
Vue.use(FormModel);
Vue.use(Menu);
Vue.use(Breadcrumb);
Vue.use(Dropdown);
Vue.use(Badge);
Vue.use(Avatar);
Vue.use(ConfigProvider);
Vue.use(List);
Vue.use(Empty);
Vue.use(Popover);
Vue.use(Alert);

Vue.config.productionTip = false
Axios.interceptors.request.use(config => {  
  if(config.push === '/'){
    console.log(1)
   } else { 
      if (localStorage.getItem('token')) { 
  //在请求头加入token，名字要和后端接收请求头的token名字一样    
           config.headers.token=localStorage.getItem('token');        
          }   
        }  
         return config;  
   },  
   error => { 
      return Promise.reject(error);
   });

//    Axios.interceptors.response.use(response => {  
//     console.log('响应回来：'+response.data.code)  
//       //和后端token失效返回码约定403    
//       if (response.data.code == 403) {
//               // 引用elementui message提示框       
//               this.$notification.open({
//                 message: '注册成功',
//                 description:
//                   '恭喜你，快来登录体验石墨烯文档吧！',
//                 onClick: () => {
//                   console.log('Notification Clicked!');
//                 },
//               });
//               //清除token  
//               localStorage.removeItem('token ');
//               //跳转      
//               router.push({name: 'login'});    
//           } else { 
//                   return response  
//           }  
//      }, 
// error => { 
//    return Promise.reject(error);  
//    })

Vue.prototype.$notification = notification;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
