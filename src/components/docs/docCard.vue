<template>
  <div>
    <a-card hoverable style="width: 190px" :title="docObj.title">
      <img
        slot="cover"
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        @click="toDocs(docObj.id)"
      />
      <template slot="actions" class="ant-card-actions">
        <a-icon type="delete" @click="confirmDelete(1)" v-if="fav!=2"/>
        <a-icon type="unlock" @click="revoverDoc()" v-if="fav==2"/>
        <a-icon type="edit" @click="showModal()" v-if="fav!=2"/>
        <a-icon type="delete" @click="confirmDelete(2)" v-if="fav==2"/>
        <a-icon type="file-add" @click="addFavorDocs()" v-if="fav==0" />
        <a-icon type="minus-square" @click="delFavorDocs()" v-if="fav==1" />
        
      </template>
      <a-card-meta :title="docObj.created_time">
        <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </a-card-meta>
    </a-card>

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
  
</template>

<script>

import axios from 'axios';

function myrefresh() {
  window.location.reload();
}
export default {
  name: 'docCard',

  props: {
    docObj: {
      id: {type: Number,dafault: 0},
      title: {type: String,default: ''},
      created_time: {type: String, default: ''}
    },
    fav: {
      type: Number
    }
  },

  data(){
    return{
      form: {
        DocumentID: "",
        title: "",
        fav: ""
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      visible: false,
    }
    
  },

  watch: {
    docObj: {
      handler(newVal) {
        this.form.DocumentID=newVal.id;
        this.form.title=newVal.title;
      },
      deep: true,
      immediate: true
    },
    fav: {
      handler(newVal) {
        this.form.fav = newVal.fav;
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    

    successmsg(message) {
      this.$message.success(message);
    },
    errormsg(message) {
      this.$message.error(message);
    },
    toDocs(id) {
      //这边判断是否能看，比如occupied
      this.$router.push("/docs2/" + id);
    },

    deleteDocs(flag,self) {
      console.log("删除该项" + self.form.DocumentID);
      let formData = new FormData();
      formData.append("DocumentID", self.form.DocumentID);
      formData.append("username", localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      if(flag == 1) {
          axios.post("http://localhost:5000/api/recycle_doc/", formData, config)
        .then(function (response) {
          console.log(response.data.message);
          if (response.data.message == "success") {
            self.successmsg("删除成功");
            setTimeout(() => {
              myrefresh();
            }, 2000);
          } else {
            self.errormsg("删除失败，请尝试刷新后重试");
          }
        })
        .catch(function () {
          self.errormsg("删除失败，请尝试刷新后重试");
        });
      }
      else {
        axios.post("http://localhost:5000/api/del_doc/", formData, config)
          .then(function (response) {
            console.log(response.data.message);
            if (response.data.message == "success") {
              self.successmsg("彻底删除成功");
              setTimeout(() => {
                myrefresh();
              }, 2000);
            } else {
              self.errormsg("彻底删除失败，请尝试刷新后重试");
            }
          })
          .catch(function () {
            self.errormsg("彻底删除失败，请尝试刷新后重试");
          });
      }
      
    },

    confirmDelete(x) {
      var _this = this;
      this.$confirm({
        title: <div style="font-weight:bold">确认删除？</div>,
        content: (x==1)?<div style="color:red;">文件将被移入回收站</div>:<div style="color:red;">文件将<span style="font-weight:bold"> 永 远 消 失 ！</span></div>,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          console.log('OK')
          _this.$options.methods.deleteDocs(x, _this);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },

    addFavorDocs() {
      console.log("收藏该项" + this.form.DocumentID);
      var _this=this;
      let formData = new FormData();
      formData.append("DocumentID", this.form.DocumentID);
      console.log(this.form)
      formData.append("username", localStorage.getItem("token"));
      console.log(localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:5000/api/favor_doc/", formData, config)
        .then(function (response) {
          console.log(response.data.message);
          if (response.data.message == "success") {
            _this.successmsg("收藏陈坤");
          } else {
            _this.errormsg("您已经收藏过改文档了哦");
          }
        })
        .catch(function () {
          _this.errormsg("收藏失败，请尝试刷新后重试");
        });
    },
    delFavorDocs() {
      console.log("取消收藏该项" + this.form.DocumentID);
      var _this=this;
      let formData = new FormData();
      formData.append("DocumentID", this.form.DocumentID);
      console.log(this.form)
      formData.append("username", localStorage.getItem("token"));
      console.log(localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:5000/api/cancel_favor_doc/", formData, config)
        .then(function (response) {
          console.log(response.data.message);
          if (response.data.message == "success") {
            _this.successmsg("取消收藏陈坤");
            setTimeout(() => {
              myrefresh();
            }, 2000);
          } else {
            _this.errormsg("取消收藏失败，请尝试刷新后重试");
          }
        })
        .catch(function () {
          _this.errormsg("取消收藏失败，请尝试刷新后重试");
        });
    },
    revoverDoc(item) {
      var _this = this;
      let formData = new FormData();
      formData.append("DocumentID", item.id);
      formData.append("username", localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:5000/api/recover_doc/", formData, config)
        .then(function (response) {
          if (response.data.message == "success") {
            _this.successmsg("恢复成功");
            setTimeout(() => {
              myrefresh();
            }, 2000);
          } else {
            _this.errormsg("恢复失败，请稍后重试");
          }
        })
        .catch(function () {
           _this.errormsg("恢复失败，请稍后重试");
        });
    },
    showModal() {
      this.form.title = this.docObj.title;
      this.form.DocumentID = this.docObj.id;
      this.visible = true;
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
}
</script>
