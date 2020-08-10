<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="1">
          <a-icon type="pie-chart" />
          <span>帮助</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="desktop" />
          <span>我的团队</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>工作台</span></span>
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
          <a-icon type="file" />
          <span>回收站</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>

       
        <div class="icons-list">
          <a-icon type="file-word" />
          <a-icon type="file-word" />
          <a-icon type="file-word" />
          <a-icon type="file-word" />
          <a-icon type="file-word" />
          <a-icon type="file-word" />
          <a-icon type="step-backward" />
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
};
</script>

<style scoped>
.icons-list >>> .anticon {
  margin-right: 60px;
  font-size: 40px;
}
</style>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.8);
  margin: 16px;
}
</style>
