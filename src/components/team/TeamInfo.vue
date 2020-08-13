<template>
  <div>
    <div :style="backgroundDiv">
      <h1 id='placeholder'> </h1>
    </div>
      <h1 id='grouptitle'> {{groupObj.groupname}}</h1>
    <div>
      <a-divider>成员列表</a-divider>
      <memberList :groupid="groupObj.groupid"></memberList>
      <a-divider>详细信息</a-divider>
      <a-descriptions layout="vertical" bordered>
        <a-descriptions-item label="团队ID" span="2">
          {{groupObj.groupid}}
        </a-descriptions-item>
        <a-descriptions-item label="建立时间" span="2">
          {{groupObj.createdtime}}
        </a-descriptions-item>
        <a-descriptions-item label="描述" span="2">
          {{groupObj.description}}
        </a-descriptions-item>
        
      </a-descriptions>
      <a-divider>团队管理</a-divider>
      <a-button type="primary" block style="margin-top:10px">邀请成员加入团队</a-button>
      <a-button type="primary" block style="margin-top:10px">管理成员权限</a-button>
      <a-button type="danger" block style="margin-top:10px;margin-bottom=10px">解散团队</a-button>
    </div>
  </div>
</template>

<script>
import memberList from './memberList';
export default {
  name: 'TeamInfo',

  components: {
    memberList,

  },

  props: {
    groupObj: {
      groupname: '',
      groupid: 0,
      createdtime: '',
      description: '',
    }

  },

  data() {
    return {
      backgroundDiv:{
        backgroundImage:'url('+require('../../assets/teaminfopic.jpg')+')',
      },
    };
  }
}
</script>

<style scoped>
#placeholder{
  padding-top:250px;
}

#grouptitle{
  margin-top:10px;
  font-size:24px;
}
</style>