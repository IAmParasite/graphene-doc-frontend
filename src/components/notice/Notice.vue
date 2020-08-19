<template>
  <div v-title data-title="请处理您的系统通知">
    <a-table
      :columns="columns"
      :data-source="data"
      style="margin-right:170px;margin-top:30px"
      rowKey="id"
    >v
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"></span>
      <span slot="action" slot-scope="text,item">
        <a-button type="primary" size="large" @click="agree_invitation(item.id)">
          <a-icon type="check" />
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
import "@/utils/htmlToPdf.js";
// import docxtemplater from 'docxtemplater'
// import PizZip from 'pizzip'
// import JSZipUtils from 'jszip-utils'
// import {saveAs} from 'file-saver'
const columns = [
  {
    title: "通知信息",
    dataIndex: "content",
    key: "content",
    width: 450,
  },
  {
    title: "通知时间",
    dataIndex: "datetime",
    key: "datetime",
    width: 350,
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" },
    width: 150,
  },
];

const data = [];
export default {
  data() {
    return {
      data,
      columns,
    };
  },
  mounted: function () {
    this.get_confirm_notice();
  },
  methods: {
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
        .post(
          "http://localhost:5000/api/view_non_confirm_notice/",
          formData,
          config
        )
        .then(function (response) {
          console.log(response.data);
          _this.data = response.data;
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },

    agree_invitation(id) {
      var _this = this;
      var item = this.data.find((item) => item.id == id);
      let formData = new FormData();
      formData.append("new_notice_id", item.id);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:5000/api/del_new_notice/", formData, config)
        .then(function (response) {
          console.log(response.data.message);
          _this.data=_this.data.filter((record)=>record.id!=item.id);
          _this.$emit('updatenotice');
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
  },
};
</script>