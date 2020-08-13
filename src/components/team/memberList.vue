<template>
<div>
  <span v-for="user in memberList" :key="user">
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
    groupid: {
      type: Number,
    },
  },

  data(){
    return{
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
    axios.post('http://localhost:5000/api/get_user_by_group/',formData,config)
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
