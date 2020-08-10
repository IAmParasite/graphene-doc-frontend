<template>
  <div>
  <a-layout style="min-height:100%">
      <a-layout-content>
        <a-card style="width:300px;margin:100px auto;">
          <h2>登录</h2>
          <a-input placeholder="用户名" ref="usernameInput" v-model="username" style="margin-top:20px">
            <a-icon slot="prefix" type="user" />
          </a-input>
          <a-input-password placeholder="密码" ref="passwordInput" v-model="password" style="margin-top:20px">
            <a-icon slot="prefix" type="info-circle" />
          </a-input-password>
          <div v-if="errorLogin" style="color:red">用户名或密码错误！</div>
          <a-row type="flex" justify="center" style="margin-top:10px;margin-bottom:30px">
          <a-col :span="11" style="margin-right:10px">
          <a-button type="primary" block @click="toRegister">注册</a-button>
          </a-col>
          <a-col :span="11">
          <a-button type="primary" block @click="checklogin">登录</a-button>
          </a-col>
          </a-row>
        </a-card>
      </a-layout-content>
  </a-layout>
  </div>
</template>

<style>

</style>

<script>
  import Vue from 'vue'
  import global_ from '../components/Global'
  import Bus from '../bus.js'
  export default{
    data() {
      return {
        username:'',
        password:"",
        token:'',
        count:"",
        errorLogin: false,
      };
    },
    created: function(){
      document.title = this.$route.meta.title || this.$route.meta.pathName
    },
    watch:{
      $route(){
        document.title = this.$route.meta.title || this.$route.meta.pathName
      },   
    },
    methods:{
      toResetpw(){
        this.$router.push({path:"/forgetpw"});
      },
      changeCurrent(){
        Bus.$emit('current','index')
      },
      toIndex(){
        this.$router.push({path:"/"});
      },
      checklogin(){
        var self = this;
        Vue.axios.post('/api/login',{
            name:this.username,
            password:this.password
        }).then(function(res){
          global_.username=self.username;
          console.log(global_.username);
          global_.token=res.data.result.token;
          global_.loginStatus=true;
          //console.log("Login Page: "+global_.token);
          self.startDivi();
          //self.$router.push({path:"/"});
          //self.destroyALL()
        }).catch(function(error){
          console.log("nmdwsm");
          console.log(error);

          self.changeErrorLogin();
        })
      },
      changeErrorLogin(){
        this.errorLogin=true;
      },
    }
  }
</script>