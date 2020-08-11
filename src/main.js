import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/icon/iconfont.css';
import 'ant-design-vue/dist/antd.css'; 
import { Button } from 'ant-design-vue';
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
import { notification } from 'ant-design-vue';

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
Vue.use(notification);Vue.prototype.$notification = notification;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
