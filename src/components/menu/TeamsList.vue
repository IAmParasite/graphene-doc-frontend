<template>
    <div>
    <a-row v-if="this.$route.params.id=='founded-team'">
      <a-col :span="10" :offset="7"></a-col>
      <a-col :span="2" :offset="5">
        <a-affix :offset-top="top">
          <a-popover placement="topRight">
            <template slot="content">
              <span style="font-size:20px">点击创建一个属于你的团队! QvQ</span>
            </template>
            <a-button type="primary" icon="plus" size="large" block @click="shownewteamform"></a-button>
          </a-popover>
        </a-affix>
      </a-col>
    </a-row>
        <a-row v-if="this.$route.params.id=='joined-team'">
      <a-col :span="10" :offset="7"></a-col>
      <a-col :span="2" :offset="5">
        <a-affix :offset-top="top">
          <a-popover placement="topRight">
            <template slot="content">
              <span style="font-size:20px">点击申请加入一个团队! QwQ</span>
            </template>
            <a-button type="primary" icon="plus" size="large" block @click="showjointeamform"></a-button>
          </a-popover>
        </a-affix>
      </a-col>
    </a-row>
        <a-list :grid="{ gutter: 25, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item">
      
      <a-card hoverable style="width: 190px" :title="item.title" >
    <img
      slot="cover"
      alt="example"
      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2480950301,2664962215&fm=26&gp=0.jpg"
      @click="toGroupDocs(item)"
    />
    <template slot="actions" class="ant-card-actions">
      <a-icon key="delete" type="delete" @click="delete_group(item)"/>
      <a-icon key="edit" type="edit" />
      <a-icon key="ellipsis" type="ellipsis" />
    </template>
    <a-card-meta :title="item.groupname" description="This is the description">
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
    </a-card-meta>
  </a-card>
    </a-list-item>
  </a-list>
    
    <div>
      <a-modal title="创建团队" :visible="newteamvisible" @ok="createteam" @cancel="cancelcreate">
        <template>
          <a-form-model :model="newteamform" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="团队队名">
              <a-input v-model="newteamform.groupname" />
            </a-form-model-item>
            <a-form-model-item label="团队简介">
              <a-input v-model="newteamform.description" />
            </a-form-model-item>
            <!-- <a-form-model-item label="协作者权限">
              <div>
                <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                  <a-checkbox
                    :indeterminate="indeterminate"
                    :checked="checkAll"
                    @change="onCheckAllChange"
                  >Check all</a-checkbox>
                </div>
                <br />
                <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" />
              </div>
            </a-form-model-item> -->
          </a-form-model>
        </template>
      </a-modal>
    </div>
     <div>
      <a-modal title="申请加入团队" :visible="newaddteamvisible" @ok="addteam" @cancel="canceladd">
        <template>
          <a-form-model :model="newteamform" :label-col="labelCol" :wrapper-col="wrapperCol">
            
          </a-form-model>
        </template>
      </a-modal>
    </div>
    </div>
</template>
<script type="text/ecmascript-6">
import axios from 'axios'
const data= [
  //
  //
  //

];
function myrefresh() {
  window.location.reload();
}
// const plainOptions = ['修改', '评论', '分享'];
// const defaultCheckedList = ['修改', '评论'];
export default {
    data(){
        return {
          data,
          // checkedList: defaultCheckedList,
          indeterminate: true,
          checkAll: false,
          // plainOptions,
          newteamvisible:false,
          newaddteamvisible:false,
          top: 0,
          visible: false,
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
          form: {
            DocumentID: "",
            title: "",
          },
          DocumentID: {
            type: Number,
          },
          newteamform:{
            groupname:"",
            description:"",
          }
        }
    },

    

    methods: {
      successmsg(message) {
      this.$message.success(message);
      },
      errormsg(message) {
        this.$message.error(message);
      },
      canceladd(){
        this.newaddteamvisible=false;
      },
      showjointeamform(){
        this.newaddteamvisible=true;
      },
      // onChange(checkedList) {
      //   this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
      //   this.checkAll = checkedList.length === plainOptions.length;
      // },
      // onCheckAllChange(e) {
      //   Object.assign(this, {
      //     checkedList: e.target.checked ? plainOptions : [],
      //     indeterminate: false,
      //     checkAll: e.target.checked,
      //   });
      // },
      createteam(){
        // this.checkedList.forEach(element => {
        //   if(element=="修改")this.newteamform.modify_right=1;
        //   if(element=="评论")this.newteamform.discuss_right=1;
        //   if(element=="分享")this.newteamform.share_right=1;
        // });
        
        this.newteam();
      },
      toGroupDocs(item){
        this.$router.push('/teamdocs-list/' + item.groupid);

        localStorage.setItem('groupInfo'+item.groupid,JSON.stringify(item));
      },
      cancelcreate(){
        this.newteamvisible=false;
      },
      addteam(){
        this.errormsg("api还没写")
      },
      shownewteamform(){
        this.newteamvisible=true;
      },
      newteam() {
        var _this=this;
        let formData = new FormData();
        formData.append("username", localStorage.getItem("token"));
        formData.append("groupname", this.newteamform.groupname);
        // formData.append("modify_right", this.newdocform.modify_right);
        // formData.append("share_right", this.newdocform.share_right);
        // formData.append("discuss_right", this.newdocform.discuss_right);
        formData.append("description", this.newteamform.description);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        
        axios
          .post(
            "http://localhost:5000/api/creategroup/",
            formData,
            config
          )
          .then(function (response) {
            if (response.data.message == "success") {
              _this.successmsg("创建成功");
              setTimeout(() => {
                myrefresh();
              }, 2000);
            } else {
              _this.errormsg("创建失败，请尝试刷新后再次创建");
            }
          })
          .catch(function () {
            _this.errormsg("创建失败，请尝试刷新后再次创建");
          });
      },
      load_list(id) {
        switch(id) {
          case 'founded-team': {
            //this.teamList.push({title:'Founded Team'});
            this.get_my_founded_teams()
            break;
          }
          case 'joined-team': {
            //this.teamList.push({title:'Joined Team'});
            this.get_my_joined_teams()
            break
          }
        }
      },
      get_my_joined_teams() {
        var _this = this;
        let formData = new FormData();
        formData.append('username', localStorage.getItem('token'));
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        axios.post('http://localhost:5000/api/mygroup/',formData,config)
            .then(function(response) {
                if(response) {
                  _this.data=response.data;
                  console.log(response.data);
                }
                else {
                    alert("请先登录！");
                }
            }).catch(function(error) {
            console.log('wrong',error);
            });
      },
      get_my_founded_teams() {
        var _this = this;
        let formData = new FormData();
        formData.append('username', localStorage.getItem('token'));
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        axios.post('http://localhost:5000/api/group_created_byme/',formData,config)
            .then(function(response) {
                if(response) {
                  _this.data=response.data;
                  console.log("创建团队列表加载完成1");
                  console.log(response);
                  console.log("创建团队列表加载完成2");
                }
                else {
                    alert("请先登录！");
                }
            }).catch(function(error) {
            console.log('wrong',error);
            });
      },
      delete_group(item) {
        var _this=this;
        this.$confirm({
          title: <div style="font-weight:bold">确认解散团队？</div>,
          content: <div style="color:red;font-weight:bold"><p>团队将被解散！</p><p>团队文档将会 永 远 消 失 ！</p></div>,
          okText: '删除',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            console.log("删除该项" + item.groupid);
            _this.data.splice(item, 1);
            
            let formData = new FormData();
            formData.append("groupid", item.groupid);
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
                    myrefresh();
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
     },
     mounted() {
      this.load_list(this.$route.params.id);
    },
}
</script>
<style>
</style>