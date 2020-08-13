<template>
<div>
  <span v-for="user in memberList" :key="user">
    <memberAvatar :username="user.username"></memberAvatar>
  </span>
</div>
</template>

<script>

import memberAvatar from '../team/memberAvatar';

export default{
  name: 'memberList',

  props: {
    groupid,
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
    memberList=[];
    let formData=new FormData();
    formData.append('groupid',groupid);
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    var _this=this;
    axios.post('http://localhost:5000/api/get_user_by_group/',formData,config)
      .then(function(responseMsg) {
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
