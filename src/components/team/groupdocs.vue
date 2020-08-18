<template>
      <div>
        <a-row>
          <a-col :span="10" :offset="7"></a-col>
          <a-col :span="2" :offset="5">
            <a-affix :offset-top="top">
              <a-popover placement="topRight">
                <template slot="content">
                  <span style="font-size:20px">点击创建属于你的文档! QuQ</span>
                </template>
                <a-button type="primary" icon="plus" size="large" block @click="shownewdocform"></a-button>
              </a-popover>
            </a-affix>
          </a-col>
        </a-row>
        
        <a-col span="18">
          <a-list :grid="{ gutter: 25, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <docCard :docObj="item" :fav="2"></docCard>
            </a-list-item>
          </a-list>
        </a-col>
        <a-col span="6" id="sider-col">
          <TeamInfo :groupid="this.$route.params.id"></TeamInfo>
        </a-col>
        <div>
            <a-modal title="创建文档" :visible="newdocvisible" @ok="createdoc" @cancel="handleCancel">
              <template>
                <a-form-model :model="newdocform" :label-col="labelCol" :wrapper-col="wrapperCol">
                  <a-form-model-item label="文档标题">
                    <a-input v-model="newdocform.title" />
                  </a-form-model-item>
                  <a-form-model-item label="协作权限">
                    <div>
                      <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                        <a-checkbox
                          :indeterminate="others_indeterminate"
                          :checked="others_checkAll"
                          @change="others_onCheckAllChange"
                        >全选</a-checkbox>
                      </div>
                      <br />
                      <a-checkbox-group v-model="others_checkedList" :options="others_plainOptions" @change="others_onChange" />
                    </div>
                  </a-form-model-item>
                  <a-form-model-item label="团队权限">
                    <div>
                      <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                        <a-checkbox
                          :indeterminate="indeterminate"
                          :checked="checkAll"
                          @change="onCheckAllChange"
                        >全选</a-checkbox>
                      </div>
                      <br />
                      <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" />
                    </div>
                  </a-form-model-item>
                   <a-form-model-item label="模版选择">
                    <div>
                      <a-radio-group v-model="templateValue" @change="onChangeTem">
                        <a-radio :value="1">空白文档
                        </a-radio>
                        <a-radio :value="2">模版 1
                        </a-radio>
                        <a-radio :value="3">模版 2
                        </a-radio>
                        
                      </a-radio-group>
                    </div>
                  </a-form-model-item>
                </a-form-model>
              </template>
            </a-modal>
          </div>  
      </div>
</template>
<script type="text/ecmascript-6">


const plainOptions = ['修改', '评论', '分享'];
const others_plainOptions = ['修改', '评论', '分享'];
const defaultCheckedList = ['修改', '评论'];
import TeamInfo from './TeamInfo.vue';
import docCard from '../docs/docCard.vue';
import axios from 'axios'

function myrefresh() {
  window.location.reload();
}
    export default {
      components: {
        TeamInfo,
        docCard,
      },
        data(){
            return {
                data:[],
                templateValue:1,
                groupObj: {
                  groupname: 'TEAMTESTINFO',
                  groupid: 111111111,
                  createdtime: 'Yesterday',
                  description: '团队精神的形成并不要求团队成员牺牲自我，相反，挥洒个性、表现特长保证了成员共同完成任务目标，',
                },
                indeterminate: true,
                others_indeterminate:true,
                checkedList: defaultCheckedList,
                others_checkedList:defaultCheckedList,
                others_checkAll:false,
                checkAll: false,
                plainOptions,
                others_plainOptions,
                newdocvisible:false,
                newdocform:{
                  title:"默认标题",
                  modify_right: 0,
                  share_right: 0,
                  discuss_right: 0,
                  others_modify_right: 0,
                  others_share_right: 0,
                  others_discuss_right: 0,
                  content:""
                },
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
                top: 0,
                content2:"# 欢迎使用 石墨烯文档模版1\n"+
                  " ------\n"+
                  "为了更好的使用文档,**graphene Markdown** 提供了两套模版系统 \n"+
                  "> * 整理知识，学习笔记\n"+
                  "> * 发布日记，杂文，所见所想\n"+
                  "> * 撰写发布技术文稿（代码支持）\n"+
                  "> * 撰写发布学术论文\n"+
                  "![cmd-markdown-logo](https://www.zybuluo.com/static/img/logo.png)\n",
                content3:
                  "# 欢迎使用 石墨烯文档模版2\n"+
                  " ------\n"+
                  "为了更好的使用文档,**graphene Markdown** 提供了两套模版系统 \n"+
                  "以下是markdown简要使用说明\n"+
                  "# Title1\n"+
                  "## Title2\n"+
                  "### Title3\n"+
                  "content\n"+
                  "==\n"+
                  "content2\n"+
                  "--\n"+
                  "content3\n"+
                  "--\n"+
                  "* name\n"+
                  "- name\n"+
                  "+ name\n"+
                  "* [I'm an inline-style link](https://www.google.com)\n"+
                  "* Inline `code` has `back-ticks around` it.\n"+
                  "```javascript\n"+
                  "var s = \"JavaScript syntax highlighting\";\n"+
                  "alert(s);\n"+
                  "```"
            }
        },
        mounted: function() {
          var _this = this;
          let formData = new FormData();
          formData.append("group_id", this.$route.params.id);
          let config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          axios
            .post("http://localhost:5000/api/get_group_docs/", formData, config)
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
        methods: {
          toDocs() {
            this.$router.push('/docs/1');
          },
          createteam(){
            // this.checkedList.forEach(element => {
            //   if(element=="修改")this.newteamform.modify_right=1;
            //   if(element=="评论")this.newteamform.discuss_right=1;
            //   if(element=="分享")this.newteamform.share_right=1;
            // });
            
            this.newteam();
          },
          onChangeTem(){},
          cancelcreate(){
            this.newteamvisible=false;
          },
          shownewteamform(){
            this.newteamvisible=true;
          },
          shownewdocform(){
            this.newdocvisible=true;
          },
          handleCancel() {
            this.newdocvisible = false;
          },
          successmsg(message) {
            this.$message.success(message);
          },
          errormsg(message) {
            this.$message.error(message);
          },
          onChange(checkedList) {
            this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
            this.checkAll = checkedList.length === plainOptions.length;
          },
          others_onChange(others_checkedList) {
            this.others_indeterminate = !!others_checkedList.length && others_checkedList.length < others_plainOptions.length;
            this.others_checkAll = others_checkedList.length === others_plainOptions.length;
          },
          createdoc(){
            this.checkedList.forEach(element => {
              if(element=="修改")this.newdocform.modify_right=1;
              if(element=="评论")this.newdocform.discuss_right=1;
              if(element=="分享")this.newdocform.share_right=1;
            });
            this.others_checkedList.forEach(element=>{
              if(element=="修改")this.newdocform.others_modify_right=1;
              if(element=="评论")this.newdocform.others_discuss_right=1;
              if(element=="分享")this.newdocform.others_share_right=1;
            });
            if (this.newdocform.title == ""){
              this.errormsg("标题为空");
              return;
            }
            switch(this.templateValue){
              case 1:
                break;
              case 2:
                this.newdocform.content=this.content2;
                break;
              case 3:
                this.newdocform.content=this.content3;
                break;
            }
            this.newdoc();
          },
          onCheckAllChange(e) {
            Object.assign(this, {
              checkedList: e.target.checked ? plainOptions : [],
              indeterminate: false,
              checkAll: e.target.checked,
            });
          },
          others_onCheckAllChange(e) {
            Object.assign(this, {
              others_checkedList: e.target.checked ? others_plainOptions : [],
              others_indeterminate: false,
              others_checkAll: e.target.checked,
            });
          },
          newdoc() {
            var _this = this;
            let formData = new FormData();
            formData.append("username", localStorage.getItem("token"));
            formData.append("title", this.newdocform.title);
            formData.append("group_id", this.$route.params.id);
            formData.append("modify_right", this.newdocform.modify_right);
            formData.append("share_right", this.newdocform.share_right);
            formData.append("discuss_right", this.newdocform.discuss_right);
            formData.append("content",this.newdocform.content);
            formData.append("others_modify_right", this.newdocform.others_modify_right);
            formData.append("others_share_right", this.newdocform.others_share_right);
            formData.append("others_discuss_right", this.newdocform.others_discuss_right);
            let config = {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            };
            axios.post(
                "http://localhost:5000/api/create_group_doc/",
                formData,
                config
              )
              .then(function (response) {
                if (response.data.message == "success") {
                  _this.successmsg("创建成功");
                  setTimeout(() => {
                    myrefresh();
                  }, 2000);
                } 
                else {
                  _this.errormsg("创建失败，请尝试刷新后再次创建");
                }
              })
              .catch(function () {
                _this.errormsg("创建失败，请尝试刷新后再次创建");
              });
          },
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