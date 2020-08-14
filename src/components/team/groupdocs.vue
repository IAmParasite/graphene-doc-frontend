<template>
      <div>
        <a-col span="18">
          <a-list :grid="{ gutter: 25, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <docCard :docObj="item"></docCard>
            </a-list-item>
          </a-list>
        </a-col>
        <a-col span="6" id="sider-col">
          <TeamInfo :groupObj="groupObj"></TeamInfo>
        </a-col>
        
      </div>
</template>
<script type="text/ecmascript-6">
import TeamInfo from './TeamInfo.vue';
import docCard from '../docs/docCard.vue';
const data = [
  {
    title: '啊',
  },
  {
    title: '啊这',
  },
  {
    title: '团队文件列表',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

    export default {
      components: {
        TeamInfo,
        docCard,
      },
        data(){
            return {
                data,
                groupObj: {
                  groupname: 'TEAMTESTINFO',
                  groupid: 111111111,
                  createdtime: 'Yesterday',
                  description: '团队精神的形成并不要求团队成员牺牲自我，相反，挥洒个性、表现特长保证了成员共同完成任务目标，',
                },
            }
        },
        mounted: function() {
          console.log('router info',this.$route.params.id);
          //this.load_data(this.$route.params.id);
    },
        methods: {
          toDocs() {
            this.$router.push('/docs/1');
          }
        }
    }
</script>
<style>
#sider-col{
  background-color: #dcdcdc;
  border: solid rgb(136, 136, 136) 1px;
  height: 100%
}
</style>