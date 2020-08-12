<template>

  <div id="app">
   
    <div id="nav" v-if="islog" :style="backgroundDiv" >
      <div style=" font-size:2px;text-align: left;" >  
      <span class="icon-juzhentanyuansujiegou" style="font-size: 85px; max-width:150px" >
        </span>
        <span class="test">石墨烯文档</span>
      </div>

      
        
      <router-link to="/">Home</router-link> 
      <router-link v-if="showUserName == null " @click.native='tolog()' to="/loginView" >| Login</router-link>
       <router-link  to="/" >
 <a-dropdown>
    <a class="ant-dropdown-link" v-if="showUserName" @click="e => e.preventDefault()">
       |    <span><a-badge dot><a-avatar shape="square" size="large" icon="user" /> {{showUserName}}</a-badge></span><a-icon type="down" />
    </a>
    <a-menu slot="overlay">
      <a-menu-item>
        <router-link to="/Personal">个人信息设置</router-link>
      </a-menu-item>
      <a-menu-item disabled>
        <a href="javascript:;" >石墨烯小程序(还未开通)</a>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <a href="javascript:;" style="color:#cf2a14;"  @click="logout">退出登陆,{{showUserName}}</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
  </router-link>

    </div>
  <div id="nav" v-if="islogging" :style="backgroundDiv" >
    
    <div style=" font-size:5px;text-align: left;" >
      <span class="icon-juzhentanyuansujiegou" style="font-size: 85px; " >
        </span>
        <span class="test">石墨烯文档</span>
      </div>
     <router-link to="/" @click.native="logback">Back</router-link> 
    </div>
   
    <router-view/>
    <AppFooter></AppFooter>
  </div>
  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0d0e06;
  background-size: cover;  
}

#nav {
  padding: 25px;
  text-align: right;
  font-size:25px;
  background-size: cover;  
  
}
#nav1 {
  padding: 25px;
  text-align: left;
  font-size:25px;
}
#nav1 a {
  font-weight: bold;
  color: #2c3e50;
}

#nav1 a.router-link-exact-active {
  color: #1a6aac;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #336cb8;
}

@font-face {
  font-family: 'webfont';
  font-display: swap;
  src: url('//at.alicdn.com/t/webfont_4c51zybezga.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/webfont_4c51zybezga.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('//at.alicdn.com/t/webfont_4c51zybezga.woff2') format('woff2'),
  url('//at.alicdn.com/t/webfont_4c51zybezga.woff') format('woff'), /* chrome、firefox */
  url('//at.alicdn.com/t/webfont_4c51zybezga.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/webfont_4c51zybezga.svg#杨任东竹石体-Bold') format('svg'); /* iOS 4.1- */
}


.test{
 font-size: 36px;
 font-family: 'webfont';
}
</style>


<script>

import AppFooter from './components/Footer.vue';
//import MessageSvg from './assets/message.svg';
export default {
  
  components:{
    
    AppFooter,
  },
  data(){
    return{
    islog:true,
    islogging:false,
    size:'large',
    backgroundDiv:{
      backgroundImage:'url('+require('./assets/timg1.jpg')+')'
    }
    }
  },
  methods:{
    logout(){
      localStorage.removeItem('token');
      this.$router.push('/loginView');
      this.$router.go(0)
    },
    tolog:function(){
      //alert(this.islog)
      this.islog=!this.islog;
      this.islogging=!this.islogging;
      //this.$router.go(0); 
    },
    handleSizeChange(e) {
        this.size = e.target.value;
      },
    logback(){
      //this.$router.go(-1); 
      this.islogging=!this.islogging;
      this.islog=!this.islog;
      this.$router.push('/');
    }
  },
  computed:{
    showUserName(){
      return localStorage.getItem('token')
    }
  }
  
  
};

</script>