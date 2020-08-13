<template>
<div>
  <span v-for="user in memberList" :key="user">
    <memberAvatar :username="user.username" :icon="user.icon"></memberAvatar>
  </span>
</div>
</template>

<script>

import memberAvatar from '../team/memberAvatar';

export default{
  name: 'memberList',

  data(){
    return{
      memberList: [
        {username: 'User01',icon: 'user'},
        {username: 'User02',icon: 'user'},
        {username: 'User03',icon: 'user'},
        {username: 'User04',icon: 'user'},
        {username: 'User05',icon: 'user'},
        {username: 'User06',icon: 'user'},
        {username: 'User07',icon: 'user'},
      ]
    };
    
  },

  components: {
    memberAvatar,
  }
}

</script>
<style></style>
