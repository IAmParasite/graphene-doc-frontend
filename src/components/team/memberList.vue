<template>
<div>
  <span v-for="(user,index) in memberList" :key="index">
    <memberAvatar :username="user.username"></memberAvatar>
  </span>
</div>
</template>

<script>

import memberAvatar from '../team/memberAvatar';
import axios from 'axios';

export default{
  name: 'memberList',

  props: {
    propGroupid: {
      type: Number,
    },
  },

  watch: {
    propGroupid: {
      handler(newVal) {
        this.groupid=newVal;
      },
      deep: true,
      immediate: true,
    }
  },

  data(){
    return{
      groupid:'',
      memberList: [],
    };
    
  },

  components: {
    memberAvatar,
  },

  mounted(){
    this.memberList=[];
    let formData=new FormData();
    formData.append('groupid',this.groupid);
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    var _this=this;
    axios.post('http://localhost:5000/api/get_user_bygroup/',formData,config)
      .then(function(response) {
        if(response) {
          _this.memberList=response.data;
        }
      }).catch(error=> {
        console.log('error',error);
      })
  }
}

</script>
<style></style>
