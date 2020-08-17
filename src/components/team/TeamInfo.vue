<template>
  <div>
    <div :style="backgroundDiv">
      <h1 id='placeholder'> </h1>
    </div>
      <a-col align="center">
        <h1 id='grouptitle'> {{groupObj.groupname}}</h1>
      </a-col>
    <div>
      <a-divider>成员列表</a-divider>
      <memberList :propGroupid="groupObj.groupid"></memberList>
      <a-divider>详细信息</a-divider>
      <a-descriptions layout="vertical" bordered style="text-align:center">
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
      <div v-if="iamfounder">
        <a-button type="primary" block>邀请成员加入团队</a-button>
        <a-button type="primary" block style="margin-top:10px">管理成员权限</a-button>
        <a-button type="danger" block style="margin-top:10px;margin-bottom=10px" @click="delete_group">解散团队</a-button>
      </div>
      <div v-else>
        <a-button type="danger" block style="margin-bottom=10px">退出团队</a-button>
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
  },

  methods: {
     successmsg(message) {
      this.$message.success(message);
      },
      errormsg(message) {
        this.$message.error(message);
      },
    delete_group() {
        var _this=this;
        this.$confirm({
          title: <div style="font-weight:bold">确认解散团队？</div>,
          content: <div style="color:red;font-weight:bold"><p>团队将被解散！</p><p>团队文档将会 永 远 消 失 ！</p></div>,
          okText: '删除',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            console.log("删除该项" + _this.groupObj.groupid);
            
            let formData = new FormData();
            formData.append("groupid", _this.groupObj.groupid);
            console.log(localStorage.getItem("token"));
            let config = {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            };
            axios
              .post("http://localhost:5000/api/delete_group/", formData, config)
              .then(function (response) {
                console.log(response.data.message);
                if (response.data.message == "success") {
                  _this.successmsg("删除成功");
                  setTimeout(() => {
                    _this.$router.go(-1);
                  }, 2000);
                } else {
                  _this.errormsg("删除失败，请尝试刷新后重试");
                }
              })
              .catch(function () {
                _this.errormsg("删除失败，请尝试刷新后重试");
              });
          },
          onCancel() {
            console.log('Cancel');
          },
        });
        },
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