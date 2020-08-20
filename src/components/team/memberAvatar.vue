<template>
  <a-popover
    style="width: 40px"
    title="用户信息"
    trigger="hover"
    :visible="hovered"
    @visibleChange="handleHoverChange"
  >
    
      <div slot="content">
        <div>
            用户名: {{username}}
            <a slot="content" @click="gotoUserInfo"><br/>点击跳转到个人主页</a>
            <a slot="content" @click="sayhi" v-if="sayh"><br/>打个招呼</a>
        </div>
      </div>
      <a-avatar :size="40"  style="margin-left:5px;margin-right:5px" @click="gotoUserInfo">{{username}}</a-avatar>
  </a-popover>
</template>
<script>
import axios from "axios";
export default {
  name: 'memberAvatar',

  props: {
    username: {
      type: String,
      default: 'not login',
      required: true,
    },
    icon: {
      type: String,
      default: 'user'
    }
  },

  data() {
    return {
      clicked: false,
      hovered: false,
      sayh:false,
    };
  },
  mounted(){
    if(this.username!=localStorage.getItem('token')){
      this.sayh=true;
    }
  },
  methods: {
    successmsg(message) {
      this.$message.success(message);
    },
    gotoUserInfo() {
      this.$router.push('/userInfo/'+this.username);
    },
    sayhi(){
      var _this=this
      let formData = new FormData();
      formData.append("sender_username",localStorage.getItem('token'));
      formData.append("receiver_username", this.username);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("http://49.235.221.218:8080/api/sayhi/", formData, config)
        .then(function (response) {
            _this.successmsg("打招呼成功，快去和他聊天吧！")
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
    handleHoverChange(visible) {
      this.clicked = false;
      this.hovered = visible;
    },
    handleClickChange(visible) {
      this.clicked = visible;
      this.hovered = false;
    },
  },
};
</script>