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
        <a-icon type="delete" @click="deleteDocs()" />
        <a-icon type="edit" @click="showModal()" />
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <a-icon key="ellipsis" type="ellipsis" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <p>功能1</p>
            </a-menu-item>
            <a-menu-item key="1">
              <p>功能2</p>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">
              <p>功能3</p>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        
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
    }
  },

  data(){
    return{
      form: {
        DocumentID: "",
        title: "",
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
    deleteDocs() {
      console.log("删除该项" + this.form.DocumentID);
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
