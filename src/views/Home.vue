<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh;">
    <a-layout-sider style="background: #fff;" v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="light" :default-selected-keys="['2']" mode="inline">
       
        <a-menu-item key="2">
          <a-icon type="user" />
          <span>我的团队</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="edit" /><span>工作台</span></span>
          <a-menu-item key="3">
            最近浏览的文档
          </a-menu-item>
          <a-menu-item key="4">
            收藏的文档
          </a-menu-item>
          <a-menu-item key="5">
            自己创建的文档
          </a-menu-item>
          <a-menu-item key="7">
            加入的团队
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="team" /><span>我创建的团队</span></span>
          <a-menu-item key="6">
            团队1
          </a-menu-item>
          <a-menu-item key="8">
            团队2
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <a-icon type="delete" />
          <span>回收站</span>
        </a-menu-item>
         <a-menu-item key="1">
          <a-icon type="question-circle" />
          <span>帮助</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      
      <a-layout-content style="margin: 0 26px;">
        <a-breadcrumb style="margin: 16px 0;text-align: left;">
          <a-breadcrumb-item>User </a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          
  
          
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        石墨烯文档
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    openNotification() {
      this.$notification.open({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    },
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
