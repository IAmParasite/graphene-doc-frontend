<template>
  <a-layout id="components-layout-demo-top-side-2" style="height:100%">

    <a-layout-header class="header" style="background: rgba(215, 215, 215, 1)">
      <div class="logo" style="width:200px;height:80px;margin-left:10px;margin-right:0"> 
        <span class="icon-juzhentanyuansujiegou" style="font-size: 64px; " ></span>
        <span class="test" style="font-size:20px">石墨烯文档</span>
      </div>
      <a-menu
        theme="light"
        mode="horizontal"
        style="background: rgba(215, 215, 215, 1);"
        :default-selected-keys="['home']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="Home" > 
          <a style="color:#545454;margin-left:10px" >
            <a-icon type="home" />Home
          </a>
          <router-link to="/">
      
          </router-link>
        </a-menu-item>
        <a-menu-item key="goback" @click="back()" v-show="isShow">
          <a-icon type="left" />
          
        </a-menu-item>

        <a-menu-item key="self" style="float:right">
          <div id="navNew" v-if="islog">
          <router-link v-if="showUserName == null " @click.native='tolog()' to="/loginView" >Login</router-link>
          <router-link  to="/" >
          <a-dropdown v-if="renderDropdown">
            <a class="ant-dropdown-link" v-if="showUserName"  @click="e => e.preventDefault()">
              <a-avatar shape="circle" size="large">{{showUserName}}</a-avatar> {{showUserName}}<a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <router-link to="/Personal">个人信息设置</router-link>
              </a-menu-item>
              <a-menu-item>
                <a  @click="gotoUserInfo">个人主页</a>
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
          <div id="navNew" v-if="islogging" >
            <router-link to="/" @click.native="logback">Back</router-link> 
          </div>
        </a-menu-item>
        
        <a-menu-item key="bell" style="margin-right:0px;float:right">
                <router-link to="/notice"><a-badge :count="noticenum" :number-style="{ backgroundColor: '#52c41a' }"><a-icon type="bell" /></a-badge></router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>

    
   
    <router-view @notice="updatenotice"></router-view>
    <a-layout-footer style="text-align: center;background-color:#ffffff">
        石墨烯文档
      </a-layout-footer>
  </a-layout>
  
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
#navNew {
  padding: 0px;
  text-align: left;
  font-size:15px;
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

#components-layout-demo-top-side-2 .logo {
  width: 80px;
  height: 150px;
  background: rgba(215, 215, 215, 0.2);
  margin: 0px 10px 16px 0;
  float: left;
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
import axios from "axios";
//import MessageSvg from './assets/message.svg';
export default {
  components:{
  },
  data(){
    return{
      collapsed: false,
      renderDropdown:false,
      noticenum:0,
      islog:true,
      islogging:false,
      size:'large',
      isShow:false,
      backgroundDiv:{
        backgroundImage:'url('+require('./assets/timg1.jpg')+')'
      },
    }
  },

  mounted(){
    if(localStorage.getItem('token')!=null) {
      this.renderDropdown=true;
      this.getnoticenum();
    }
    else this.renderDropdown=false;
  },

  methods:{
    updatenotice(){
      this.noticenum--;
    },
     gotoUserInfo() {
      this.$router.push('/userInfo/'+localStorage.getItem('token'));
    },
    back(){
      this.$router.go(-1);
      //this.$router.go(0);
    },
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
    },
    getnoticenum(){
      let formData = new FormData();
      formData.append("receiver_username", localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post("http://49.235.221.218:8080/api/num_of_notice/", formData, config)
        .then(function (response) {
            _this.noticenum=response.data.notice_cnt;
            console.log(_this.noticenum);
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    }
  },
  computed:{
    showUserName(){
      return localStorage.getItem('token')
    }
  },
  watch:{
  $route(now){     //监控路由变换，控制返回按钮的显示
     if(now.path=="/"){
            this.isShow=false;
     } else{
         this.isShow=true;
     }
  }
  }
  
};

</script>