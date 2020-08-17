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
        <a-button type="primary" block style="margin-top:10px" @click="showModal">邀请成员加入团队</a-button>
        <a-button type="primary" block style="margin-top:10px" @click="showModal2">管理成员权限</a-button>
         <a-button type="danger" block style="margin-top:10px;margin-bottom=10px" @click="delete_group">解散团队</a-button>
        <a-modal title="邀请成员加入团队" :visible="visible"   :footer="null" @ok="handleOk" @cancel="handleCancel">
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

        <a-modal title="管理成员权限" :visible="visible2" :footer="null" @cancel="handleCancel2">
            <template>
              <div>
                <a-table :columns="columns" :data-source="data2" rowKey="id">
                   <!--<a slot="action" slot-scope="text" href="javascript:;">Delete</a>-->
                  <a slot="action" slot-scope="text" href="javascript:;" @click="deleteMem(text.id)">Delete</a>
                 
                  <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
                    {{ record.description }}
                  </p>
                </a-table>
              </div>
            </template>
        </a-modal>

      </div>
      <div v-else>
        <a-button type="danger" block style="margin-bottom=10px">退出团队</a-button>
      </div>
    </div>
  </div>
</template>

<script>
function myrefresh() {
  window.location.reload();
}
const columns = [
  { title: 'Name', dataIndex: 'username', key: 'username' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } },
];
const data = [
];
const data2 = [
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
      visible2: false,
      confirmLoading: false,
      userid: 0,
      data,
      data2,
      columns,
    };
  },
  mounted() {
    var _this = this;
    let formData = new FormData();
    formData.append("username", localStorage.getItem("token"));
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:5000/api/get_user/", formData, config)
      .then(function (response) {
        if (response) {
          _this.userid = response.data.id;
          console.log(_this.userid);
        } else {
          alert("请先登录！");
        }
      })
      .catch(function (error) {
        console.log("wrong", error);
      });
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
    showModal2() {
      this.visible2 = true;
      this.get_groupmem();
    },
    handleOk() {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      console.log('Clicked cancel button');
      this.visible = false;
    },
    handleCancel2() {
      console.log('Clicked cancel button');
      this.visible2 = false;
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
    get_groupmem() {
      let formData=new FormData();
      console.log(this.groupid)
      formData.append('groupid',this.groupid);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      var _this=this;
      axios.post('http://localhost:5000/api/get_user_bygroup/',formData,config)
        .then(function(response) {
          if(response) {
            _this.data2 = response.data;
          }
        }).catch(error=> {
          console.log('error',error);
        })
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
            setTimeout(() => {
              myrefresh();
            }, 2000);

          } else {
            _this.errormsg("邀请失败");
          }
        })
        .catch(function (error) {
          console.log("wrong", error);
        });
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
          }
        })
      },
      deleteMem(id) {
        var _this=this;
        this.$confirm({
          title: <div style="font-weight:bold">确定删除改成员？</div>,
          content: <div style="color:red;font-weight:bold"><p>改成员会被踢出团队！</p></div>,
          okText: '删除',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            console.log("删除该成员" + id);
            let formData = new FormData();
            formData.append("groupid", _this.groupid);
            formData.append("leaderid", _this.userid);
            formData.append("userid", id)
            console.log("组号" + _this.groupid);
            console.log("执行者是" + _this.userid);
            let config = {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            };
            axios
              .post("http://localhost:5000/api/delete_user/", formData, config)
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