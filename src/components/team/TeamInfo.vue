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
      <div v-if="iamfounder">
        <a-button type="primary" block style="margin-top:10px" @click="showModal">邀请成员加入团队</a-button>
        <a-button type="primary" block style="margin-top:10px">管理成员权限</a-button>
        <a-button type="danger" block style="margin-top:10px;margin-bottom=10px">解散团队</a-button>
        <a-modal title="邀请成员加入团队" :visible="visible"  @ok="handleOk" @cancel="handleCancel">
            <template>
              <div>
                <a-input-search placeholder="请输入你想要搜索的用户名" enter-button @search="onSearch" />
                <br /><br />
                <a-table :columns="columns" :data-source="data" rowKey="id">
                   <!--<a slot="action" slot-scope="text" href="javascript:;">Delete</a>-->
                  <a slot="action" slot-scope="text" href="javascript:;" @click="invite(text.id)">Invite</a>
                 
                  <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
                    {{ record.description }}
                  </p>
                </a-table>
              </div>
            </template>
        </a-modal>
      </div>
      <div v-else>
        <a-button type="danger" block style="margin-top:10px;margin-bottom=10px">退出团队</a-button>
      </div>
    </div>
  </div>
</template>

<script>
const columns = [
  { title: 'Name', dataIndex: 'username', key: 'username' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } },
];
const data = [
];
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
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      data,
      columns,
    };
  },
  methods: {
    successmsg(message) {
      this.$message.success(message);
    },
    errormsg(message) {
        this.$message.error(message);
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
    onSearch(value) {   //   搜索框显示
      console.log(value);
      this.get_user(value)
    },
    get_user(value) {
      var _this = this;
      let formData = new FormData();
      console.log(this.groupid)
      formData.append("groupid", this.groupid);
      formData.append("keyword", value);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:5000/api/queryuser/", formData, config)
        .then(function (response) {
          if (response) {
            _this.data = response.data;
            console.log(response.data);
          } else {
            alert("请先登录！");
          }
        })
        .catch(function (error) {
          console.log("wrong", error);
        });
    },
    confirm(e) {  // 邀请确认
      console.log(e);
      this.$message.success('Click on Yes');
    },
    cancel(e) {   // 邀请确认
      console.log(e);
      this.$message.error('Click on No');
    },
    invite(id) {
      console.log("邀请用户的id " + id)
      console.log("邀请组的id" + this.groupid)
      console.log("用户" + localStorage.getItem('token'))
      var _this = this;
      let formData = new FormData();
      formData.append("user_id", id);
      formData.append("group_id", this.groupid);
      formData.append("leader_username", localStorage.getItem('token'));
      
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios.post("http://localhost:5000/api/invite_user/", formData, config)
        .then(function (response) {
          if (response) {
            _this.successmsg("邀请成功");
          } else {
            _this.errormsg("邀请失败");
          }
        })
        .catch(function (error) {
          console.log("wrong", error);
        });
    }
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