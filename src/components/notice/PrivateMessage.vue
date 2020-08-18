<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-sider width="50" style="background: #fff" :style="{minHeight:'600px'}">
      <a-list :data-source="this.user">
        <a-list-item slot="renderItem" slot-scope="item" width="50">
          <memberAvatar :username="item.username"></memberAvatar>
        </a-list-item>
      </a-list>
    </a-layout-sider>
    <a-layout :style="{marginRight:'50px',marginLeft:'50px',marginTop:'20px',background:'#fff'}">
      <a-layout-content :style="{ padding: '0 24px', minHeight: '400px' ,overflow: 'initial'}">
        <a-layout-content :style="{ margin: '24px 16px 0', minHeight:'450px'}">
          <div
            v-infinite-scroll="handleInfiniteOnLoad"
            class="demo-infinite-container"
            :infinite-scroll-disabled="busy"
            :infinite-scroll-distance="10"
          >
            <a-list :data-source="this.data">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta :description="item.content">
                   <memberAvatar :username="item.username"></memberAvatar>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center',background:'#fff' }">
          <a-input-search placeholder enter-button="Send" size="large" @search="send" />
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
import infiniteScroll from 'vue-infinite-scroll';
export default {
  name: "PrivateMessage",
  directives: { infiniteScroll },
  components: {
    memberAvatar,
  },
  data() {
    return {
      user: [
        {
          username: "xp",
          id: 1,
        },
        {
          username: "zyh",
          id: 2,
        },
        {
          username: "zcy",
          id: 3,
        },
      ],
      data: [
        {
          username: "xp",
          content: "你好",
          datetime: moment().subtract(1, "days"),
        },
        {
          username: "xp",
          content: "你好",
          datetime: moment().subtract(1, "days"),
        },
        {
          username: "xp",
          content: "你好",
          datetime: moment().subtract(1, "days"),
        },
        {
          username: "xp",
          content: "你好",
          datetime: moment().subtract(1, "days"),
        },
        {
          username: "xp",
          content: "你好",
          datetime: moment().subtract(1, "days"),
        },
      ],
    };
  },
  methods: {
    send() {},
  },
};
</script>