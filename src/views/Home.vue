<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh;">
    <a-layout-sider style="background: #fff;" v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="light" :default-selected-keys="['2']" mode="inline" @select="handleSelect"> 
       
        <a-menu-item key="team-index">
          <a-icon type="user" />
          <span>我的团队</span>
          
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="edit" /><span>工作台</span></span>
          <a-menu-item key="recent-docs">
            最近浏览的文档
          </a-menu-item>
          <a-menu-item key="enshrine-docs">
            收藏的文档
          </a-menu-item>
          <a-menu-item key="own-docs">
            自己创建的文档
          </a-menu-item>
          <a-menu-item key="teams-mem">
            加入的团队
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="team" /><span>我创建的团队</span></span>
          <a-menu-item key="team1">
            团队1
          </a-menu-item>
          <a-menu-item key="team2">
            团队2
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="dustbin">
          <a-icon type="delete" />
          <span>回收站</span>
        </a-menu-item>
         <a-menu-item key="help">
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
        
        <div style="margin-top:10px">
          <router-view></router-view>
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
  methods:{  
        handleSelect(key, keyPath){
            console.log(key)
            switch(key.key){
                case "help":
                    console.log("帮助页面")
                    this.$router.push('/help')
                    this.breadcrumbItems  = ['导航一']
                    break;
                case "team-index":
                    this.$router.push('/team')
                    this.breadcrumbItems  = ['导航二']
                    break;
                case "recent-docs":
                    this.$router.push('/recent-docs')
                    this.breadcrumbItems  = ['导航三']
                    break;
                case "enshrine-docs":
                    this.$router.push('/enshrine-docs')
                    this.breadcrumbItems  = ['导航三']
                    break;
                case "own-docs":
                    this.$router.push('/own-docs')
                    this.breadcrumbItems  = ['导航三']
                    break;
                case "dustbin":
                    this.$router.push('/dustbin')
                    this.breadcrumbItems  = ['导航三']
                    break;
                default:
                  console.log("nothing")
            }
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
