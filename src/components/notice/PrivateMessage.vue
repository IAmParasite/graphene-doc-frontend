<template>
  <a-layout id="components-layout-demo-top-side-2">
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
              :data-source="this.showdata"
              style="margin-left:0px;margin-top:0px"
              rowKey="id"
              :pagination="false"
            >
              <span slot="action" slot-scope="text,item">
                <a-button type="primary" size="large" @click="agree_invitation(item.id)">
                  <a-icon type="check" />
                </a-button>
                <a-divider type="vertical" />
                <a-button type="danger" size="large" @click="refuse_invitation(item.id)">
                  <a-icon type="close" />
                </a-button>
                <a>{{ item.blank }}</a>
              </span>
            </a-table>
          </div>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center',background:'#fff' }">
          <a-input-search
            placeholder
            enter-button="Send"
            size="large"
            @click="send"
          ></a-input-search>
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
import moment from "moment";
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

const data = [
  {
    sender_name: "xp",
    content: "你好",
    sendtime: moment().subtract(1, "days"),
  },
  {
    sender_name: "xp",
    content: "你好",
    sendtime: moment().subtract(1, "days"),
  },
  {
    sender_name: "xp",
    content: "哈哈哈",
    sendtime: moment().subtract(1, "days"),
  },
  {
    sender_name: "xp",
    content: "lsp了aaa",
    sendtime: moment().subtract(1, "days"),
  },
  {
    sender_name: "xzcy",
    content: "好",
    datetime: moment().subtract(1, "days"),
  },
  {
    sender_name: "xzcy",
    content: "好",
    sendtime: moment().subtract(1, "days"),
  },
  {
    sender_name: "xzcy",
    content: "好",
    sendtime: moment().subtract(1, "days"),
  },
];

const user = [
  {
    sender_name: "xp1",
    id: 1,
  },
  {
    sender_name: "zyh",
    id: 2,
  },
  {
    sender_name: "zcy",
    id: 3,
  },
];

const showdata = [];
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
      showdata,
      columns,
      sendobj,
    };
  },
  mounted: function () {
    this.who_send_msg();
    this.receive_all_msg();
  },
  methods: {
    who_send_msg() {
      let formData = new FormData();
      formData.append("receiver_username", localStorage.getItem("token"));
      console.log("123");
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      console.log("12345");
      axios
        .post("http://localhost:5000/api/send_msg_people/", formData, config)
        .then(function (response) {
          console.log("1234");
          _this.user = response.data;
          console.log(response.data);
          console.log("4321");
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
    thisusermsg(sender_name) {
      console.log("dianle");
      this.showdata = this.data.filter(
        (item) => item.sender_name == sender_name
      );
      this.sendobj = sender_name;
    },
    receive_all_msg() {
      let formData = new FormData();
      formData.append("receiver_username", localStorage.getItem("token"));
      console.log("abc");
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      console.log("abcde");
      axios
        .post("http://localhost:5000/api/who_send_msg/", formData, config)
        .then(function (response) {
          console.log("abcd");
          _this.data = response.data;
          console.log(response.data);
          console.log("dcba");
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
    send(value) {
      console.log(value+":value");
      let formData = new FormData();
      formData.append("sender_username", this.sendobj);
      formData.append("receiver_username",localStorage.getItem("token"));
      formData.append("content",value);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post("http://localhost:5000/api/send_msg_to_sb/", formData, config)
        .then(function (response) {
          console.log(response.data);
          this.showdata.push(response.data);
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
    /*
    get_my_message() {
      var item = this.data.find(
        (item) => item.sender_username == sender_username
      );
      console.log("成昆");
      //console.log(item.sender_username+":sender-username");
      console.log("沪宁");
      let formData = new FormData();
      formData.append("receiver_username", localStorage.getItem("token"));
      //formData.append("sender_username", item.sender_username);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post("http://localhost:5000/api/our_msg/", formData, config)
        .then(function (response) {
          _this.data = response.data;
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },*/
  },
};
</script>