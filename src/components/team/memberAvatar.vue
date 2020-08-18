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
        </div>
      </div>
      <a-avatar :size="40"  style="margin-left:5px;margin-right:5px" @click="gotoUserInfo">{{username}}</a-avatar>
  </a-popover>
</template>
<script>

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
    };
  },
  methods: {
    gotoUserInfo() {
      this.$router.push('/userInfo/'+this.username);
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