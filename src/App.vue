<template>
  <div id="app">
    <div id="nav" v-if="islog">
      <router-link to="/">Home</router-link> |
      <router-link @click.native='tolog()' to="/login" >login</router-link>
    </div>
  <div id="nav1" v-if="islogging">
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
  color: #2c3e50;
}

#nav {
  padding: 25px;
  text-align: right;
  font-size:25px;
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
    }
  },
  methods:{
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
    }
  },
  
  
  
};

</script>