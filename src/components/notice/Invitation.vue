<template>
  <div>
    <a-table :columns="columns" :data-source="data" style="margin-right:170px;margin-top:30px" rowKey="id">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle">
      </span>
      <span slot="action" slot-scope="text, record">
        <a-button type="primary" size="large" >
            <a-icon type="check" @click="agree_invitation(record.id)"/>
        </a-button>
        <a-divider type="vertical" />
        <a-button type="danger" size="large">
            <a-icon type="close" @click="refuse_invitation(record.id)"/>
        </a-button>
        <a-divider type="vertical" />
        <a-button size="large" @click="delete_invitation(record.id)">
            <a-icon type="delete" />
        </a-button>
        <a>{{ record.blank }}</a>
      </span>
    </a-table>
  </div>
</template>
<script type="text/ecmascript-6">
// import { mavonEditor } from "mavon-editor";
// import memberAvatar from '../team/memberAvatar';
import "mavon-editor/dist/css/index.css";
import axios from "axios";
// import moment from "moment";
import "@/utils/htmlToPdf.js"
// import docxtemplater from 'docxtemplater'
// import PizZip from 'pizzip'
// import JSZipUtils from 'jszip-utils'
// import {saveAs} from 'file-saver'

const columns = [
  {
    title:"邀请团队",
    dataIndex: "group_name",
    key: "group_name",
    width: 150,
  },
  {
    title: "邀请者",
    dataIndex: "sender_id",
    key: "sender_name",
    width: 150,
  },
  {
    title: "邀请信息",
    dataIndex: "content",
    key: "content",
    ellipsis: false,
    width: 200,
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" },
    width: 300,
  },
];

const data = [
  
];
export default {
  data() {
    return {
      data,
      columns,
    };
  },
  mounted :function(){
    this.get_confirm_notice();
  },
  methods :{
    get_confirm_notice() {
      let formData = new FormData();
      formData.append("receiver_username", localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post("http://localhost:5000/api/view_confirm_notice/", formData, config)
        .then(function (response) {
          console.log(response.data.message);
            console.log("程坤");
            console.log("澄明");
            _this.data=response.data;
            console.log(response);
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },

    agree_invitation(id){
      console.log(id+":要接受的noticeid");
      let formData = new FormData();
      formData.append("new_notice_id", id);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      
      axios
        .post("http://localhost:5000/api/del_new_notice/", formData, config)
        .then(function (response) {
            console.log("程坤");
            console.log(response.data.message);
            console.log("澄明");
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },

    refuse_invitation(id){
      console.log(id+":要删除的noticeid");
      let formData = new FormData();
      formData.append("new_notice_id", id);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      
      axios
        .post("http://localhost:5000/api/del_new_notice/", formData, config)
        .then(function (response) {
            console.log("程坤");
            console.log(response.data.message);
            console.log("澄明");
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
    

    delete_invitation(id){
      console.log(id+":要删除的noticeid");
      let formData = new FormData();
      formData.append("new_notice_id", id);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      
      axios
        .post("http://localhost:5000/api/del_new_notice/", formData, config)
        .then(function (response) {
            console.log("程坤");
            console.log(response.data.message);
            console.log("澄明");
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    }
  },
};
</script>