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
      <a-descriptions>
        <a-descriptions-item label="团队ID">
          {{groupObj.groupid}}
        </a-descriptions-item>
        <a-descriptions-item label="建立时间">
          {{groupObj.createdtime}}
        </a-descriptions-item>
        <a-descriptions-item label="描述">
          {{groupObj.description}}
        </a-descriptions-item>
        
      </a-descriptions>
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
  font-size:50px;
}
</style>