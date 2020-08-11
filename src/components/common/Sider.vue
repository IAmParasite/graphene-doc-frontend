<template>
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
</template>

<script>
export default {
    name: 'Sider',
    data() {
        return {
        collapsed: false,
        };
    },
}
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>