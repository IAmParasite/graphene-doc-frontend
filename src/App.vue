<template>
  <div id="app">
    <div id="nav" v-if="islog">
     
      <router-link to="/">Home</router-link> |
      
      <router-link @click.native='tolog()' to="/login" >login</router-link>
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
  padding: 30px;
  text-align: right;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #3094a1;
}
</style>


<script>

import AppFooter from './components/Footer.vue';

export default {
  
  components:{
    
    AppFooter,
  },
  data(){
    return{
    islog:true,
    }
  },
  methods:{
    tolog:function(){
      //alert(this.islog)
      this.islog=!this.islog;
      //this.$router.go(0); 
    }
  },
  
  
  
};
</script>