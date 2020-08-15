<template>
  <div class="home">
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout>
        <a-layout-sider width="300" style="background: #fff">
          <a-tabs type="card" @change="callback">
            <a-tab-pane key="1" tab="评论">
              <div style="margin-left:20px;margin-right:20px;"> 
              <a-input-search
                placeholder="输入评论"
                v-model="keyword"
                enter-button="评论"
                size="large"
                @search="newComment"
              />
              </div>
              <a-list
                class="comment-list"
                item-layout="horizontal"
                :data-source="comment"
              >
                <a-list-item slot="renderItem" slot-scope="item" style="height:80px;">
                  <a-comment :author="item.username" :avatar="avatar">
                    <p align="left" slot="content">{{ item.content }}</p>
                    <a-tooltip slot="datetime" :title="moment(item.datetime).format('YYYY-MM-DD HH:mm:ss')">
                      <span>{{ moment(item.datetime).fromNow()}}</span>
                    </a-tooltip>
                  </a-comment>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="2" tab="历史">Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane key="3" tab="分享">Content of Tab Pane 3</a-tab-pane>
          </a-tabs>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
          <a-breadcrumb style="margin: 16px 0"></a-breadcrumb>
          <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
          >
            <mavon-editor
              v-model="content"
              ref="md"
              @change="change"
              style="min-height: 600px;"
              @save="save_docs()"
            />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import axios from "axios";
import moment from "moment";
export default {
  name: "Home",
  components: {
    mavonEditor,
  },
  data() {
    return {
      content: "<p> 请在这里开始你的?文档编辑</p>",
      html: "",
      configs: {},
      collapsed: false,
      moment,
      keyword: "",
      comment: [
      ],
      avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    };
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    // 提交
    callback() {},
    save_docs() {
      console.log(this.content);
      console.log(this.$route.params.id);
      let formData = new FormData();
      formData.append("content", this.content);
      formData.append("DocumentID", this.$route.params.id);
      formData.append("username", localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post("http://localhost:5000/api/modify_doc/", formData, config)
        .then(function (response) {
          console.log(response.data.message);
          if (response.data.message == "success") {
            console.log("程坤");
          } else {
            console.log("失败");
          }
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
    // 新的评论
    newComment() {
      console.log(this.keyword);
      this.comment.push({ content: this.keyword,username:localStorage.getItem("token"),datatime:moment().add(8,'hours')});
      let formData=new FormData();
      formData.append("DocumentID", this.$route.params.id);
      formData.append("username", localStorage.getItem("token"));
      formData.append("content",this.keyword);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post("http://localhost:5000/api/create_comment/", formData, config)
        .then(function (response) {
          console.log(response.data.message);
          if (response.data.message == "success") {
            console.log("程坤");
          } else {
            console.log("失败");
          }
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
      this.keyword = "";
    },
    load_data(id) {
      console.log("Begin load_data" + id);
      let formData = new FormData();
      formData.append("DocumentID", id);
      formData.append("username", localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post("http://localhost:5000/api/get_doccontent/", formData, config)
        .then(function (response) {
          console.log(response.data.message);
          if (response.data.message == "success") {
            console.log("程坤");
            console.log(response.data.content);
            _this.content = response.data.content;
          } else {
            console.log("失败");
          }
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://49.235.221.218:8888/conn";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      console.log("连接成功！");
    },
    sendcontent() {
      this.websocketsend(JSON.stringify(this.content));
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      console.log(JSON.parse(e.data));
      this.content = JSON.parse(e.data);
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },
    load_comment(id){
      let formData = new FormData();
      formData.append("DocumentID", id);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post("http://localhost:5000/api/get_all_comment/", formData, config)
        .then(function (response) {
          if (response) {
            console.log(response.data);
            _this.comment=response.data;
          } else {
            console.log("失败");
          }
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    }
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  mounted: function () {
    console.log(this.$route.params.id);
    this.load_data(this.$route.params.id);
    this.load_comment(this.$route.params.id);
    //this.initWebSocket();
  },
  watch: {
    content() {
      //this.sendcontent();
    },
  },
};
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>