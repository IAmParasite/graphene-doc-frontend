<template>
  <div>
    <a-list :grid="{ gutter: 25, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <docCard :docObj="item" :fav="2"></docCard>
      </a-list-item>
    </a-list>
  </div>
</template>
<script type="text/ecmascript-6">
import axios from "axios";
import docCard from '../docs/docCard.vue';
const data = [
  //   {
  //     id:'',//文档id
  //     title: '',//标题名字
  //     description:'',//简介
  //     created_time:'',//创建时间
  //     modify_right:'',//是否有修改权限,针对协作者，创建者拥有全部权限 1:yes 0:no
  //     share_right:'',//是否有分享权限，同上 1:yes 0:no
  //     discuss_right:'',//是否有评论权限，同上 1:yes 0:no
  //     recycled:'',//是否放入了回收站 0:not 1:yes
  //     is_occupied:'',//是否有人在使用文档，这时候文档上锁，不可读不可写 0: Not occupied, 1: Occupied
  //     group_id:'',//团队id，如果是0那么该文档是个人文档
  //     modified_time:'',//上次修改时间，任意一个人修改都会改变上次修改时间
  //   },
];
export default {
  components: {
    docCard,
  },
  data() {
    return {
      data,
    };
  },
  methods: {
  },
  mounted() {
    var _this = this;
    let formData = new FormData();
    formData.append("username", localStorage.getItem("token"));
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:5000/api/my_deleted_docs/", formData, config)
      .then(function (response) {
        if (response) {
          _this.data = response.data;
          console.log(response.data);
        } else {
          alert("请先登录！");
        }
      })
      .catch(function (error) {
        console.log("wrong", error);
      });
  },
};
</script>
<style>
</style>
