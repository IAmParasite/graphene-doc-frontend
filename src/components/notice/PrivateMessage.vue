<template>
  <a-layout id="components-layout-demo-top-side-2"  v-title data-title="请处理您的私信">
    <a-layout-sider
      width="50"
      style="background: #fff"
      :style="{minHeight:'600px',marginTop:'20px'}"
    >
      <a-list :data-source="this.user">
        <a-list-item
          slot="renderItem"
          slot-scope="item"
          width="50"
          @click="thisusermsg(item.sender_name)"
        >
          <memberAvatar :username="item.sender_name"></memberAvatar>
        </a-list-item>
      </a-list>
    </a-layout-sider>
    <a-layout :style="{marginRight:'50px',marginLeft:'50px',marginTop:'20px',background:'#fff'}">
      <a-layout-content :style="{ padding: '0 24px', minHeight: '400px' ,overflow: 'initial'}">
        <a-layout-content :style="{ margin: '0px 0px 0', minHeight:'450px'}">
          <div class="demo-infinite-container" :infinite-scroll-distance="10">
            <a-table
              :columns="columns"
              :data-source="this.data"
              style="margin-left:0px;margin-top:0px"
              rowKey="id"
              :pagination="false"
            >
            </a-table>
          </div>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center',background:'#fff' }">
          <a-input-search  v-model="key" enter-button="Send" @search="send"/>
        </a-layout-footer>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
<script type="text/ecmascript-6">
import memberAvatar from "../team/memberAvatar";
import axios from "axios";
import infiniteScroll from "vue-infinite-scroll";
import "mavon-editor/dist/css/index.css";
import "@/utils/htmlToPdf.js";

const columns = [
  {
    title: "发言者",
    dataIndex: "sender_name",
    key: "sender_name",
    width: 80,
  },
  {
    title: "信息",
    dataIndex: "content",
    key: "content",
    width: 300,
  },
  {
    title: "发言时间",
    dataIndex: "send_time",
    key: "send_time",
    width: 300,
  },
];

const data = [];

const user = [];

const sendobj="";
export default {
  name: "PrivateMessage",
  directives: { infiniteScroll },
  components: {
    memberAvatar,
  },
  data() {
    return {
      user,
      data,
      columns,
      sendobj,
      key:"",
    };
  },
  mounted: function () {
    this.who_send_msg();
  },
  methods: {
    who_send_msg() {
      let formData = new FormData();
      formData.append("receiver_username", localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post("http://49.235.221.218:8080/api/send_msg_people/", formData, config)
        .then(function (response) {
          _this.user = response.data;
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
    thisusermsg(sender_name) {
      let formData = new FormData();
      formData.append("receiver_username", localStorage.getItem("token"));
      formData.append("sender_username",sender_name)
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post("http://49.235.221.218:8080/api/our_msg/", formData, config)
        .then(function (response) {
          _this.data = response.data;
          console.log(response.data);
          _this.sendobj=sender_name;
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
    send() {
      let formData = new FormData();
      formData.append("receiver_username", this.sendobj);
      formData.append("sender_username",localStorage.getItem("token"));
      formData.append("content",this.key);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post("http://49.235.221.218:8080/api/send_msg_to_sb/", formData, config)
        .then(function (response) {
          console.log(response.data);
          _this.data.push(response.data);
          _this.key="";
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
  },
};
</script>