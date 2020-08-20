<template>
    <div>    
    <a-list :grid="{ gutter: 25, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <docCard :docObj="item" :fav="0"></docCard>
      </a-list-item>
    </a-list>
    </div>
</template>
<script type="text/ecmascript-6">
import docCard from '../docs/docCard.vue'
import axios from "axios";
const data = [
  
];
export default {
  components: {
    docCard,
  },
  data(){
    return {
      data,
    }
  },
  methods: {
    toDocs() {
      this.$router.push('/docs/1');
    }
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
      .post("http://49.235.221.218:8080/api/show_recent_doc/", formData, config)
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
}
</script>
<style>
</style>