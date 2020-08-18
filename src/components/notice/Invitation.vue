<template>
  <div>
    <a-table :columns="columns" :data-source="data" style="margin-right:170px;margin-top:30px" rowKey="id">
      <span slot="action" slot-scope="text,item">
        <a-button type="primary" size="large"  @click="agree_invitation(item.id)">
            <a-icon type="check"/>
        </a-button>
        <a-divider type="vertical" />
        <a-button type="danger" size="large" @click="refuse_invitation(item.id)">
            <a-icon type="close" />
        </a-button>
        <a>{{ item.blank }}</a>
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
    dataIndex: "sender_name",
    key: "sender_name",
    width: 150,
  },
  {
    title: "邀请时间",
    dataIndex: "datetime",
    key: "datetime",
    ellipsis: false,
    width: 200,
  },
  {
    title: "Action",
    key:"action",
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
            _this.data=response.data;
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },

    agree_invitation(id){
      var _this=this
      var item=this.data.find(item => item.id==id);
      console.log(item.id+":要接受的noticeid");
      let formData = new FormData();
      formData.append("id",item.id);
      formData.append("userid", item.receiver_id);
      formData.append("groupid",item.group_id);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:5000/api/addgroupmember/", formData, config)
        .then(function () {
             _this.data=_this.data.filter((record)=>record.id!=item.id)
             _this.$emit('updatenotice');
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },

    refuse_invitation(id){
      var item=this.data.find(item => item.id==id);
      var _this=this;
      console.log(item.id+":要拒绝的noticeid");
      let formData = new FormData();
      formData.append("id",item.id);
      formData.append("userid", item.receiver_id);
      formData.append("groupid",item.group_id);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      
      axios
        .post("http://localhost:5000/api/refuse_groupmember/", formData, config)
        .then(function () {
            _this.data=_this.data.filter((record)=>record.id!=item.id)
            _this.$emit('updatenotice');
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
  },
};
</script>