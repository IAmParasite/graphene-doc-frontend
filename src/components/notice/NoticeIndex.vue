<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh;">
    <a-layout-sider style="background: #fff;" v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="light" mode="inline" :default-selected-keys="['1']"  @select="handleSelect">
        <a-menu-item key="private-message">
          <a-icon type="user" />
          <span class="nav-text">用户私信</span>
        </a-menu-item>
        <a-menu-item key="application">
          <a-icon type="video-camera" />
          <span class="nav-text">申请信息</span>
        </a-menu-item>
        <a-menu-item key="invitation">
          <a-icon type="upload" />
          <span class="nav-text">邀请信息</span>
        </a-menu-item>
        <a-menu-item key="notice">
          <a-icon type="info-circle" />
          <span class="nav-text">系统通知</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '50px' }">
      <div style="margin-top:30px;height:590px;">
          <router-view v-if="isRouterAlive" @updatenotice="updatenotice"></router-view>
      </div>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      isRouterAlive: true,
      collapsed: false,
    };
  },
  methods:{  
    updatenotice(){
      this.$emit('notice');
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },   
    handleSelect(key) {
        console.log(key)
        switch(key.key){
            case "invitation":
                this.$router.push('/invitation')
                break;
            case "private-message":
                this.$router.push('/private-message')
                break;
            case "application":
                this.$router.push('/application')
                break;
            case "notice":
                this.$router.push('/notice')
                break;
            default:
              console.log("nothing")
        }
    },
  },
}
</script>
<style>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
