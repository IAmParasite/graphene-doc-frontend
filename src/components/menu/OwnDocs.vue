<template>
  <div>
    <a-row>
      <a-col :span="11" :offset="7"></a-col>
      <a-col :span="1" :offset="5">
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

    <a-list :grid="{ gutter: 25, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <docCard :docObj="item" :fav="0"></docCard>
      </a-list-item>
    </a-list>
    <div>
      <a-modal title="创建文档" :visible="newdocvisible" @ok="createdoc" @cancel="cancelcreate">
        <template>
          <a-form-model :model="newdocform" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="文档标题">
              <a-input v-model="newdocform.title" />
            </a-form-model-item>
            <a-form-model-item label="协作者权限">
              <div>
                <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                  <a-checkbox
                    :indeterminate="indeterminate"
                    :checked="checkAll"
                    @change="onCheckAllChange"
                  >Check all</a-checkbox>
                </div>
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
import axios from "axios";
import docCard from '../docs/docCard.vue'
const data = [
  //   {
  //     id:'',//文档id
  //     title: '',//标题名字
  //     description:'',//简介
  //     created_time:'',//创建时间
  //     modify_right:'',//是否有修改权限,针对协作者，创建者拥有全部权限 1:yes 0:no
  //     share_right:'',//是否有分享权限，同上 1:yes 0:no
  //     discuss_right:'',//是否有评论权限，同上 1:yes 0:no
  //     recycled:'',//是否放入了回收站 0:not 1:yes
  //     is_occupied:'',//是否有人在使用文档，这时候文档上锁，不可读不可写 0: Not occupied, 1: Occupied
  //     group_id:'',//团队id，如果是0那么该文档是个人文档
  //     modified_time:'',//上次修改时间，任意一个人修改都会改变上次修改时间
  //   },
];
function myrefresh() {
  window.location.reload();
}
const plainOptions = ['修改', '评论', '分享'];
const defaultCheckedList = ['修改', '评论'];
export default {
  components: {
    docCard,
  },
  data() {
    return {
      templateValue:1,
      checkedList: defaultCheckedList,
      indeterminate: true,
      indeterminateTem: true,
      checkAll: false,
      plainOptions,
      newdocvisible:false,
      data,
      top: 0,
      visible: false,
      DocumentID: {
        type: Number,
      },
      newdocform:{
        title:"",
        modify_right:0,
        share_right:0,
        discuss_right:0,
        content:""
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
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
    };
  },
  methods: {
    successmsg(message) {
      this.$message.success(message);
    },
    errormsg(message) {
      this.$message.error(message);
    },
    onChange(checkedList) {
      this.indeterminate = !! checkedList.length && checkedList.length < plainOptions.length;
      this.checkAll = checkedList.length === plainOptions.length;
    },
    onChangeTem(e){
      console.log('radio checked',e.target.templateValue);
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    },
    createdoc(){
      this.checkedList.forEach(element => {
        if(element=="修改")this.newdocform.modify_right=1;
        if(element=="评论")this.newdocform.discuss_right=1;
        if(element=="分享")this.newdocform.share_right=1;
      });
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
    cancelcreate(){
      this.newdocvisible=false;
    },
    shownewdocform(){
      this.newdocvisible=true;
    },
    newdoc() {
      var _this=this;
      let formData = new FormData();
      formData.append("username", localStorage.getItem("token"));
      formData.append("title", this.newdocform.title);
      formData.append("modify_right", this.newdocform.modify_right);
      formData.append("share_right", this.newdocform.share_right);
      formData.append("discuss_right", this.newdocform.discuss_right);
      formData.append("content", this.newdocform.content);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios.post("http://localhost:5000/api/create_personal_doc/", formData, config)
        .then(function (response) {
          if (response.data.message == "success") {
            _this.successmsg("创建成功");
            setTimeout(() => {
              myrefresh();
            }, 2000);
          } 
          else {
            _this.errormsg("创建失败，请尝试刷新后再次创建1");
          }
        })
        .catch(function (error) {
          console.log(error)
          _this.errormsg("创建失败，请尝试刷新后再次创建2");
        });
    },
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
      .post("http://localhost:5000/api/my_created_docs/", formData, config)
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
};
</script>
<style>
</style>
