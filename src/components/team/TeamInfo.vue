<template>
  <div>
    <div :style="backgroundDiv">
      <h1 id='placeholder'> </h1>
    </div>
      <h1 id='grouptitle'> {{groupObj.groupname}}</h1>
    <div>
      <a-divider>成员列表</a-divider>
      <memberList :propGroupid="groupObj.groupid"></memberList>
      <a-divider>详细信息</a-divider>
      <a-descriptions layout="vertical" bordered>
        <a-descriptions-item label="团队ID" span="1">
          {{groupObj.groupid}}
        </a-descriptions-item>
        <a-descriptions-item label="建立时间" span="2">
          {{groupObj.createdtime}}
        </a-descriptions-item>
        <a-descriptions-item label="描述" span="1">
          {{groupObj.description}}
        </a-descriptions-item>
        
      </a-descriptions>
      <a-divider>团队管理</a-divider>
      {{iamfounder}}
      <div v-if="iamfounder">
        <a-button type="primary" block style="margin-top:10px">邀请成员加入团队</a-button>
        <a-button type="primary" block style="margin-top:10px">管理成员权限</a-button>
        <a-button type="danger" block style="margin-top:10px;margin-bottom=10px">解散团队</a-button>
      </div>
      <div v-else>
        <a-button type="danger" block style="margin-top:10px;margin-bottom=10px">退出团队</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import memberList from './memberList';
import axios from 'axios';
export default {
  name: 'TeamInfo',

  components: {
    memberList,

  },

  props: {
    groupid: {
      type: String,
      default: '',
    },
  },

  watch:{
    groupid: {
      handler(newVal) {
        if(localStorage.getItem('groupInfo'+newVal)) {
          this.groupObj=JSON.parse(localStorage.getItem('groupInfo'+newVal));
        }
        else {
          alert('路由跳转失效，检查localStorage');
        }
        console.log("watch saw changes with groupid");
        var _this = this;
          let formData = new FormData();
          formData.append("groupid", this.$route.params.id);
          formData.append("username",localStorage.getItem('token'));
          let config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          axios
            .post("http://localhost:5000/api/groupiscreatedbyme/", formData, config)
            .then(function (response) {
              if (response) {
                _this.iamfounder=(response.data.message=='yes');
              } else {
                alert("请先登录！");
              }
            })
            .catch(function (error) {
              console.log("wrong", error);
            });
      },
      deep: true,
      immediate: true,
    },
  },

  data() {
    return {
      iamfounder:false,
      groupObj: {

      },
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