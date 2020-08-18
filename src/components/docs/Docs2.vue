<template>
  <div class="home" >
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout>
        <!-- 左侧边栏 -->
        <a-layout-sider width="300" style="background: #fff">
          <a-tabs type="card" @change="callback">
            <!-- 评论tab -->
            <a-tab-pane key="1" tab="评论" :disabled="!discuss_right">
              <!-- 新的评论 -->
              <div style="margin-left:5px;margin-right:5px;"> 
              <a-input-search
                placeholder="输入评论"
                v-model="keyword"
                enter-button="评论"
                @search="newComment"
              />
              </div>
              <!-- 评论列表 -->
              <a-list
                class="comment-list"
                item-layout="horizontal"
                :data-source="comment"
              >
                <a-list-item slot="renderItem" slot-scope="item" style="height:70px;float:left;">
                  <memberAvatar :username="item.username"></memberAvatar>
                  <a-comment style="margin-right:10px;width:200px">
                    <p align="left" slot="content">{{ item.content }}</p>
                    <a-tooltip slot="datetime" :title="moment(item.datetime).subtract(8,'hours').format('YYYY-MM-DD HH:mm:ss')">
                      <span>{{ moment(item.datetime).subtract(8,'hours').fromNow()}}</span>
                    </a-tooltip>
                  </a-comment>
                </a-list-item>
              </a-list>
              
            </a-tab-pane>
            <!-- 历史修改记录tab -->
            <a-tab-pane key="2" tab="历史">
              <!-- 历史列表 -->
              <a-list
                class="comment-list"
                item-layout="horizontal"
                :data-source="modify_history"
              >
                <a-list-item slot="renderItem" slot-scope="item" style="height:70px;float:left;">
                  <memberAvatar :username="item.username"></memberAvatar>
                  <a-comment style="margin-right:10px;width:200px">
                    <p align="left" slot="content">{{item.content}}</p>
                    <a-tooltip slot="datetime" :title="moment(item.datetime).subtract(8,'hours').format('YYYY-MM-DD HH:mm:ss')">
                      <span>{{ moment(item.datetime).subtract(8,'hours').fromNow()}}</span>
                    </a-tooltip>
                  </a-comment>
                </a-list-item>
              </a-list></a-tab-pane>
            <!-- 分享tab -->
            <a-tab-pane key="3" tab="分享" :disabled="!share_right">
              <a-input placeholder="用户名" v-model="inviteuser"/>
              <a-button type="primary" block style="margin-top:10px;margin-bottom=10px" @click="searchuser">搜索用户</a-button>
              <a-table rowKey="id" v-show="invitedata != null " :columns="inviteColumns" :data-source="invitedata" size="small" >
                <a slot="action" slot-scope="text" href="javascript:;" @click="invite(text.id)">Share</a>
              </a-table>
            </a-tab-pane>

            <!--权限编辑tab-->
            <a-tab-pane key="4" tab="权限管理">
              <div style="margin-left:10px;margin-right:10px">
                <privilege-pane :propRightObj="rights"></privilege-pane>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-layout-sider>
        <!-- 主编辑区 -->
        <a-layout style="padding: 0 24px 24px">
          <a-breadcrumb style="margin: 16px 0"></a-breadcrumb>
          <!--正在编辑的用户列表-->
          <a-row>
            <span style="float:left">正在编辑：</span>
            <span v-for="(user,index) in userList" :key="index">
              <memberAvatar :username="user.username" style="float:right"></memberAvatar>
            </span>
          </a-row>
          <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
          >
          
            <mavon-editor 
              
              v-model="content"
              ref="md"
              @change="change"
              style="min-height: 600px; z-index:1"
              :editable="modify_right"
              @save="save_docs()"
            />
          
          </a-layout-content>
          <a-button @click="getPdf()"><a-icon type="download" size="small"/>导出为pdf</a-button>
          <a-button @click="exportWord()"><a-icon type="download" />导出为word</a-button>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>


<script  type="text/javascript" charset="utf-8"  src="js/html2canvas.js"></script>
<script  type="text/javascript" charset="utf-8" src="js/jsPdf.debug.js"></script>
<script  type="text/javascript" charset="utf-8" src="js/canvas2image.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/jspdf/1.3.4/jspdf.debug.js"></script>
<script>
import { mavonEditor } from "mavon-editor";
import memberAvatar from '../team/memberAvatar';
import "mavon-editor/dist/css/index.css";
import axios from "axios";
import moment from "moment";
import "@/utils/htmlToPdf.js"
import docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import {saveAs} from 'file-saver'
import privilegePane from './privilegePane.vue'
import $ from 'jquery'
import html2canvas from 'html2canvas'


const inviteColumns = [
  {
    title:'Email',
    dataIndex:'email',
    key:'email'
  },
  {
    title:'Username',
    dataIndex:'username',
    key:'username',
  },
  { 
    title: 'Action',
    dataIndex: '',
    key: 'x',
     scopedSlots: { 
       customRender: 'action' 
       }
  },
];
function myrefresh() {
  window.location.reload();
}

export default {
  name: "Home",
  components: {
    mavonEditor,
    memberAvatar,
    privilegePane,
  },
  data() {
    return {
      htmlTitle: "导出文件",
      //定时刷新正在编辑的用户列表
      timer:'',
      userList:[],

      inviteuser:"",
      inviteColumns,
      invitedata:[],
      form: {
        content: "",
        username: "",
        title: ""
      },
      content: "",
      html: "",
      configs: {},
      collapsed: false,
      moment,
      keyword: "",
      comment: [],
      modify_history:[],
      watch_right:false,
      modify_right:true,
      discuss_right:true,
      share_right:true,
      userId:0,
      rights:{
      }
    };
  },
  methods: {
    exportReport(){
      exportReportTemplet()
    },
    //刷新正在编辑的用户列表的方法
    refreshUserList() {

    },

    exportWord: function() {
      let _this = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent("/template.docx", function(error, content) {
        // input.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
        // 抛出异常
        if (error) {
          console.log(error)
          throw error;
        }
        
        // 创建一个JSZip实例，内容为模板的内容
        let zip = new PizZip(content);
        // 创建并加载docxtemplater实例对象
        let doc = new docxtemplater().loadZip(zip);
        // 设置模板变量的值
        doc.setData({
          ..._this.form,
          table: _this.tableData
        });
        
        try {
          // 用模板变量的值替换所有模板变量
          doc.render();
        } catch (error) {
          // 抛出异常
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          };
          console.log(JSON.stringify({ error: e }));
          throw error;
        }
        
        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        let out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, "Docs.docx");
      });
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    successmsg(message) {
      this.$message.success(message);
    },
    errormsg(message) {
      this.$message.error(message);
    },
    warningmsg(message) {
      this.$message.warning(message);
    },
    //加载用户权限
    load_right(id){
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
        .post("http://localhost:5000/api/tell_doc_right/", formData, config)
        .then(function (response) {
          if (response) {
            console.log(response.data);
            _this.rights=response.data;
            console.log("loading rights",_this.rights)
            if(response.data.usertype==0){
              _this.watch_right=response.data.others_watch_right;
              _this.modify_right=response.data.others_modify_right;
              _this.discuss_right=response.data.others_discuss_right;
              _this.share_right=response.data.others_share_right;
            }
            else{
              _this.watch_right=response.data.watch_right;
              _this.modify_right=response.data.modify_right;
              _this.discuss_right=response.data.discuss_right;
              _this.share_right=response.data.share_right;
            }
            console.log(_this.discuss_right);
            console.log(_this.share_right);
            console.log(_this.watch_right);
            console.log(_this.modify_right);
            if(!_this.watch_right){
              _this.warningmsg("您没有权限浏览该文档")
              setTimeout(() => {
                _this.$router.push("/");
                _this.$router.go(0);
              }, 2000);
            }
            else{
              _this.load_data(_this.$route.params.id);
              if(_this.discuss_right==true){
                _this.load_comment(_this.$route.params.id);
              }
              _this.load_modify_history(_this.$route.params.id);
              //this.initWebSocket();
            }
            
          } else {
            console.log("失败");
          }
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
    searchuser(){
      
      var _this = this;
      let formData = new FormData();
      formData.append("keyword",_this.inviteuser);
      formData.append("document_id", _this.$route.params.id);
      let config = {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            };
            axios.post(
                "http://localhost:5000/api/query_notindoc_user/",
                formData,
                config
              )
              .then(function (response) {
                if (response.data != null) {
                  //_this.successmsg("zhao成功");
                  console.log(response.data)
                  _this.invitedata = response.data;
                } 
                else {
                  console.log(response.data)
                  _this.errormsg("查找失败，请尝试刷新后再次创建");
                }
              })
              .catch(function () {
                _this.errormsg("查找失败，请尝试刷新后再次创建");
              });
          },
    invite(e){
      var _this = this;
      let formData = new FormData();
      formData.append("user_id", this.userId);
      formData.append("DocumentID",_this.$route.params.id);
      formData.append("target_user_id",e );
      console.log("文档id 被邀请人id 邀请者id")
      console.log(_this.$route.params.id)
      console.log(e)
      console.log(_this.userId)
      console.log("b")
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios.post("http://localhost:5000/api/pernal_doc_share_to/", formData, config)
        .then(function (response) {
          //console.log(response.data)
          if (response) {
            _this.successmsg("邀请成功");
          } else {
            _this.errormsg("邀请失败");
          }
        })
        .catch(function (error) {
          console.log("wrong", error);
        });
    },
    
    callback() {},
    // 提交
    save_docs() {
      var _this=this
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
            _this.successmsg("保存成功");
            setTimeout(() => {
              myrefresh();
            }, 2000);
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
      this.comment.unshift({ content: this.keyword,username:localStorage.getItem("token"),datetime:moment().add(8,'hours')});
      console.log(moment().add(8,'hours').calendar())
      let formData=new FormData();
      formData.append("DocumentID", this.$route.params.id);
      formData.append("username", localStorage.getItem("token"));
      formData.append("content",this.keyword);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:5000/api/create_comment/", formData, config)
        .then(function (response) {
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
          if (response.data.message == "success") {
            _this.content = response.data.content;
            _this.form.content = response.data.content;
            _this.form.username = localStorage.getItem("token");
            console.log("表格中的信息" +  _this.form.content)
          } else {
            console.log("失败");
          }
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
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
            _this.comment=response.data;
          } else {
            console.log("失败");
          }
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
    load_modify_history(id){
      let formData = new FormData();
      formData.append("DocumentID", id);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post("http://localhost:5000/api/get_all_modified_time/", formData, config)
        .then(function (response) {
          if (response) {
            _this.modify_history=response.data;
          } else {
            console.log("失败");
          }
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
    initWebSocket(){ //初始化weosocket
      const wsuri = "ws://49.235.221.218:8888/conn";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      console.log('连接成功！')
    },
    sendcontent(){
      this.websocketsend(JSON.stringify(this.content));
    },
    websocketonerror(){//连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e){ //数据接收
      console.log(JSON.parse(e.data))
      this.content=JSON.parse(e.data)
    },
    websocketsend(Data){//数据发送
      this.websock.send(Data);
    },
    websocketclose(){  //关闭
      console.log('断开连接');
    },
    load_id(){
      let formData1 = new FormData();
      var _this=this;
      formData1.append("username", localStorage.getItem('token'));
      let config1 = {
        headers: {
          "Content-Type": "multipart/form-data1",
        },
      };
      axios.post("http://localhost:5000/api/get_user/", formData1, config1)
        .then(function (response) {
          console.log(response.data)
          if (response) {
            //_this.successmsg("邀请成功");
            _this.userId = response.data.id
            
          } else {
            _this.errormsg("获取用户ID失败");
          }
        })
        .catch(function (error) {
          console.log("wrong", error);
        });
    }
  },
  
  destroyed() {
    clearInterval(this.timer);
    //this.websock.close(); //离开路由之后断开websocket连接
  },
  mounted: function () {
    this.timer=setInterval(this.refreshUserList,1000);
    //this.initWebSocket();
    this.load_right(this.$route.params.id);
    this.load_id();
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