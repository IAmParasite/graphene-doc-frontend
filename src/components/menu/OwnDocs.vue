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

    <a-list :grid="{ gutter: 25, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card hoverable style="width: 190px" :title="item.title">
          <img
            slot="cover"
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            @click="toDocs(item.id)"
          />
          <template slot="actions" class="ant-card-actions">
            <a-icon type="delete" @click="deleteDocs(item)" />
            <a-icon type="edit" @click="showModal(item)" />
            <a-icon key="ellipsis" type="ellipsis" />
          </template>
          <a-card-meta :title="item.created_time">
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-card-meta>
        </a-card>
      </a-list-item>
    </a-list>
    <div>
      <a-modal title="修改文档信息" :visible="visible" @ok="handleOk" @cancel="handleCancel">
        <template>
          <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="文档标题">
              <a-input v-model="form.title" />
            </a-form-model-item>
          </a-form-model>
        </template>
      </a-modal>
    </div>
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
                <br />
                <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" />
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
  data() {
    return {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
      newdocvisible:false,
      data,
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
      newdocform:{
        title:"",
        modify_right:0,
        share_right:0,
        discuss_right:0
      }
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
      this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
      this.checkAll = checkedList.length === plainOptions.length;
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
      this.newdoc();
    },
    cancelcreate(){
      this.newdocvisible=false;
    },
    shownewdocform(){
      this.newdocvisible=true;
    },
    showModal(item) {
      this.form.title = item.title;
      this.form.DocumentID = item.id;
      this.visible = true;
    },
    toDocs(id) {
      //这边判断是否能看，比如occupied
      this.$router.push("/docs2/" + id);
    },
    newdoc() {
      var _this=this;
      let formData = new FormData();
      formData.append("username", localStorage.getItem("token"));
      formData.append("title", this.newdocform.title);
      formData.append("modify_right", this.newdocform.modify_right);
      formData.append("share_right", this.newdocform.share_right);
      formData.append("discuss_right", this.newdocform.discuss_right);
      formData.append("content", "");
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(
          "http://localhost:5000/api/create_personal_doc/",
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
    deleteDocs(item) {
      console.log("删除该项" + item.id);
      this.data.splice(item, 1);
      var _this=this;
      let formData = new FormData();
      formData.append("DocumentID", item.id);
      formData.append("username", localStorage.getItem("token"));
      console.log(localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:5000/api/recycle_doc/", formData, config)
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
    handleOk() {
      var _this = this;
      let formData = new FormData();
      formData.append("DocumentID", this.form.DocumentID);
      formData.append("title", this.form.title);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:5000/api/modify_doc_basic/", formData, config)
        .then(function (response) {
          if (response) {
            _this.successmsg("修改成功！");
            setTimeout(() => {
              myrefresh();
            }, 2000);
          } else {
            _this.errormsg("修改失败，请尝试刷新后再次修改！");
          }
        })
        .catch(function () {
          _this.errormsg("修改失败，请尝试刷新后再次修改！");
        });
    },
    handleCancel() {
      this.visible = false;
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
