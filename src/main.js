import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css'; 
import { Button } from 'ant-design-vue';
import { Card } from 'ant-design-vue';
import { Col } from 'ant-design-vue';
import { Row } from 'ant-design-vue';
import { Icon } from 'ant-design-vue';
import { Layout } from 'ant-design-vue';
import { Input } from 'ant-design-vue';
import { Menu } from 'ant-design-vue';
//import { Grid } from 'ant-design-vue';
Vue.use(Button);
Vue.use(Input);
Vue.use(Layout);
Vue.use(Card);
Vue.use(Layout);
Vue.use(Col);
Vue.use(Row);
Vue.use(Icon);
Vue.use(Menu);
//Vue.use(Grid);
//Vue.use(col);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
 
}).$mount('#app')
