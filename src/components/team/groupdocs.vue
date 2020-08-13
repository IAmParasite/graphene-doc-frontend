<template>
      <div>
        <a-col span="18">
            <a-list :grid="{ gutter: 25, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              
              <a-card hoverable style="width: 190px" :title="item.title" @click="toDocs()">
            <img
              slot="cover"
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <template slot="actions" class="ant-card-actions">
              <a-icon key="setting" type="setting" />
              <a-icon key="edit" type="edit" />
              <a-icon key="ellipsis" type="ellipsis" />
            </template>
            <a-card-meta title="Card title" description="This is the description">
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-card-meta>
          </a-card>
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
          console.log(this.$route.params.id);
          this.load_data(this.$route.params.id);
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