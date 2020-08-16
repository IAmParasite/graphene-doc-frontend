<template>
  <a-popover
    style="width: 40px"
    title="简要信息"
    trigger="hover"
    :visible="hovered"
    @visibleChange="handleHoverChange"
  >
    <div slot="content">
      这里展示简要信息<br/>{{username}}
    </div>
    <a-popover
      style="width: 32px"
      title="详细信息"
      trigger="click"
      :visible="clicked"
      @visibleChange="handleClickChange"
    >
      <div slot="content">
        <div>
          这里展示详细信息<br/>{{username}}<br/>邮箱
        </div>
      </div>
      <a-avatar :size="40"  style="margin-left:5px;margin-right:5px">{{username}}</a-avatar>
    </a-popover>
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
    hide() {
      this.clicked = false;
      this.hovered = false;
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