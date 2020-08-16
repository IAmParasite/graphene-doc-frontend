<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="logo"> 
          石墨文档 
        </div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']"  @select="handleSelect">
        <a-menu-item key="private-message">
          <a-icon type="user" />
          <span class="nav-text">用户私信</span>
        </a-menu-item>
        <a-menu-item key="application">
          <a-icon type="video-camera" />
          <span class="nav-text">申请信息反馈</span>
        </a-menu-item>
        <a-menu-item key="invitation">
          <a-icon type="upload" />
          <span class="nav-text">邀请信息</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '400px' }">
      <div style="margin-top:30px">
          <router-view v-if="isRouterAlive"></router-view>
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
            default:
              console.log("nothing")
        }
    },
    openNotification() {
      this.$notification.open({
        description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!');
      },
      });
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
