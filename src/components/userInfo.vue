<template>
  <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
    <a-card title="用户信息" style="width:80%;height:80%;margin:100px auto;">
      <div style="width: 100%">
        <a-layout>
          <a-row>
            <a-col :span=6> 
              <a-avatar :size="64"  style="margin-top:60px">{{userObj.username}}</a-avatar>
            </a-col>
            <a-col :span=18 align='left'>
              <a-divider></a-divider>
              <a-row>
                <a-col span=6>
                  用户名：
                </a-col>
                <a-col span=6>
                  {{userObj.username}}
                </a-col>
              </a-row>
              <a-divider></a-divider>
              <a-row>
                <a-col span=6>
                  Email:
                </a-col>
                <a-col span=6>
                  {{userObj.email}}
                </a-col>
              </a-row>
              <a-divider></a-divider>
              
            </a-col>
          </a-row>
        </a-layout>
      </div>
    </a-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'userInfo',

  data(){
    return{
      loading:false,
      disabled:false,

      userObj: {
        username: '',
        email: '',
      },
    };
  },

  mounted(){
    let formData=new FormData();
    formData.append('username',this.$route.params.username);
    console.log(this.$route.params.username);
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    var _this=this;
    axios.post('http://localhost:5000/api/get_user/',formData,config)
      .then(function(response) {
        if(response) {
          _this.userObj=response.data;
        }
      }).catch(error=> {
        console.log('error',error);
      })
  }
}
</script>