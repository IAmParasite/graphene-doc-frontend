<template>
  <div>
    <div id="placeholder">

    </div>
    <a-col align="center">
      <h1 id='grouptitle'> {{groupObj.groupname}}</h1>
    </a-col>
    <div>
      <a-divider></a-divider>
      <memberList :propGroupid="groupObj.groupid"></memberList>
      <a-divider/>
      <a-col layout="vertical" bordered style="text-align:center;margin-left:20px;margin-right:20px">
        <a-row>
          <a-col span=8 align="left">团队ID</a-col>
          <a-col span=16 align="left">{{groupObj.groupid}}</a-col>
        </a-row>
        <a-row>
          <a-col span=8 align="left">建立时间</a-col>
          <a-col span=16 align="left">{{groupObj.createdtime}}</a-col>
        </a-row>
        <a-row>
          <a-col span=8 align="left">描述</a-col>
          <a-col span=16 align="left">{{groupObj.description}}</a-col>
        </a-row>
        
      </a-col>
      <div v-if="iamfounder">
        <a-col style="margin:10px">
        <a-divider/>
        <a-button type="primary" block style="margin-top:10px;" @click="showModal">邀请成员加入团队</a-button>
        <a-button type="primary" block style="margin-top:10px" @click="showModal2">管理成员</a-button>
        <a-button type="primary" block style="margin-top:10px" @click="showModal3">管理文档</a-button>
        <a-button type="danger" block style="margin-top:10px;margin-bottom=10px" @click="delete_group">解散团队</a-button>
        </a-col>
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

        <a-modal title="管理成员" :visible="visible2" :footer="null" @cancel="handleCancel2">
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

        <a-modal title="管理文档" :visible="visible3" :footer="null" @cancel="handleCancel3">
            <template>
              <div>
                <a-table :columns="columns2" :data-source="data3" rowKey="id">
                   <!--<a slot="action" slot-scope="text" href="javascript:;">Delete</a>-->
                   <span slot="action" slot-scope="item">
                      <a  @click="detachDocs(item.id)">Detach</a>
                      <a-divider type="vertical" />
                      <a @click="deleteDocs(item.id)">Delete</a>
                    </span>
                  <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
                    {{ record.description }}
                  </p>
                </a-table>
              </div>
            </template>
        </a-modal>

      </div>
      <div v-else>
        <a-button type="danger" block style="margin-bottom=10px" @click="Quit()">退出团队</a-button>
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
const columns2 = [
  { title: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Mem_id', dataIndex: 'creator_id', key: 'creator_id' },
  { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } },
];
const data = [
];
const data2 = [
];
const data3 = [

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
      visible3: false,
      confirmLoading: false,
      userid: 0,
      data,
      data2,
      data3,
      columns,
      columns2,
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
    showModal3() {
      this.visible3 = true;
      this.get_groupdocs();
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
    handleCancel3() {
      console.log('Clicked cancel button');
      this.visible3 = false;
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
            _this.data2=_this.data2.filter(item=>item.username!=localStorage.getItem('token'))
          }
        }).catch(error=> {
          console.log('error',error);
        })
    },
    get_groupdocs() {
      var _this = this;
          let formData = new FormData();
          formData.append("group_id", this.groupid);
          let config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          axios
            .post("http://localhost:5000/api/get_group_docs/", formData, config)
            .then(function (response) {
              if (response) {
                _this.data3 = response.data;
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
            title: <div style="font-weight:bold">确定删除该成员？</div>,
            content: <div style="color:red;font-weight:bold"><p>该成员会被踢出团队！</p></div>,
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              let formData = new FormData();
              formData.append("groupid", _this.groupid);
              formData.append("leaderid", _this.userid);
              formData.append("userid", id)
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
    deleteDocs(id) {
          var _this=this;
          this.$confirm({
            title: <div style="font-weight:bold">确定删除该文档？</div>,
            content: <div style="color:red;font-weight:bold"><p>该文档会被移入创建者的回收站中！</p></div>,
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              let formData = new FormData();
              formData.append("DocumentID", id)
              let config = {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              };
              axios.post("http://localhost:5000/api/recycle_doc_2/", formData, config)
                .then(function (response) {
                  console.log("返回的结果是" + response.data.message);
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
    detachDocs(id) {
        var _this=this;
          this.$confirm({
            title: <div style="font-weight:bold">确定移除该文档？</div>,
            content: <div style="color:red;font-weight:bold"><p>该文档会被移入你的工作台中！</p></div>,
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              console.log("移除该文档" + id);
              let formData = new FormData();
              formData.append("DocumentID", id)
              let config = {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              };
              axios.post("url", formData, config)
                .then(function (response) {
                  console.log("返回的结果是" + response.data.message);
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
    Quit() {
          var _this=this;
          this.$confirm({
            title: <div style="font-weight:bold">确认</div>,
            content: <div style="color:red;font-weight:bold"><p>您确定要退出该团队嘛</p></div>,
            okText: '退出',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              console.log("退出该团队" + _this.groupid);
              let formData = new FormData();
              formData.append("userid", localStorage.getItem("userid"));
              formData.append("groupid", _this.groupid);
              let config = {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              };
              axios.post("http://localhost:5000/api/quit_group/", formData, config)
                .then(function (response) {
                  console.log("返回的结果是" + response.data.message);
                  if (response.data.message == "success") {
                    _this.successmsg("退出成功");
                    setTimeout(() => {
                      _this.$router.go(-1);
                    }, 2000);
                  } else {
                    _this.errormsg("退出失败，请尝试刷新后重试");
                  }
                })
                .catch(function () {
                  _this.errormsg("退出失败，请尝试刷新后重试");
              });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  }
}
</script>

<style scoped>
#placeholder{
  padding-top:200px;
  background-image:url(../../assets/teaminfopic.jpg);
}

#grouptitle{
  margin-top:10px;
  font-size:24px;
}
</style>