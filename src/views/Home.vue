<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh;" v-title data-title="石墨烯文档主页">
    <a-layout-sider style="background: #fff;" v-model="collapsed" collapsible theme="light">
      <a-menu theme="light" :default-selected-keys="['recent-docs']" mode="inline" @select="handleSelect" style="margin-top:20px"> 
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="edit" /><span>工作台</span></span>
          <a-menu-item key="recent-docs">
            最近浏览的文档
          </a-menu-item>
          <a-menu-item key="enshrine-docs">
            我收藏的文档
          </a-menu-item>
          <a-menu-item key="own-docs">
            我创建的文档
          </a-menu-item>
          <a-menu-item key="my-cor-docs">
            我协作的文档
          </a-menu-item>
          <!--a-menu-item key="teams-mem">
            加入的团队
          </a-menu-item-->
        </a-sub-menu>
        <!--a-menu-item key="team-index">
          <a-icon type="user" />
          <span>我的团队</span>
          
        </a-menu-item-->

        <a-sub-menu key="sub-team">
          <span slot="title"><a-icon type="team"/><span>我的团队</span></span>
          <a-menu-item key="founded-team" @click="reload">我创建的团队</a-menu-item>
          <a-menu-item key="joined-team" @click="reload">我加入的团队</a-menu-item>
        </a-sub-menu>

        <!--a-sub-menu key="sub2">
          <span slot="title"><a-icon type="team" /><span>我创建的团队</span></span>
          <a-menu-item key="team1">
            团队1
          </a-menu-item>
          <a-menu-item key="team2">
            团队2
          </a-menu-item>
        </a-sub-menu-->
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
        <!-- <a-breadcrumb style="margin: 16px 0;text-align: left;">
          <a-breadcrumb-item>User </a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb> -->
        
        <div style="margin-top:10px">
          <router-view v-if="isRouterAlive"></router-view>
        </div>
      </a-layout-content>
      
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
        handleSelect(key){
            console.log(key)
            switch(key.key){
                case "help":
                    console.log("帮助页面")
                    this.$router.push('/help')
                    break;
                case "team-index":
                    this.$router.push('/team')
                    break;
                case "recent-docs":
                    this.$router.push('/recent-docs')
                    break;
                case "enshrine-docs":
                    this.$router.push('/enshrine-docs')
                    break;
                case "own-docs":
                    this.$router.push('/own-docs')
                    break;
                case "dustbin":
                    this.$router.push('/dustbin')
                    break;
                case "founded-team":
                    this.$router.push('/teams-list/founded-team')
                    break;
                case "joined-team":
                  this.$router.push('/teams-list/joined-team');
                  break;
                case "my-cor-docs":
                  this.$router.push('/my-cor-docs');
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
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
