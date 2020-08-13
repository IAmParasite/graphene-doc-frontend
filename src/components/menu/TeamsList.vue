<template>
    <div>
        <a-list :grid="{ gutter: 25, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }" :data-source="teamList">
    <a-list-item slot="renderItem" slot-scope="item">
      
      <a-card hoverable style="width: 190px" :title="item.title">
    <img
      slot="cover"
      alt="example"
      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2480950301,2664962215&fm=26&gp=0.jpg"
      
      
    />
    <template slot="actions" class="ant-card-actions">
      <a-icon key="setting" type="setting" />
      <a-icon key="edit" type="edit" />
      <a-icon key="ellipsis" type="ellipsis" />
    </template>
    <a-card-meta title="Card title" description="This is the description">
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
    </a-card-meta>
  </a-card>
    </a-list-item>
  </a-list>
    
    </div>
</template>
<script type="text/ecmascript-6">
import axios from 'axios';
export default {
    data(){
        return {
            teamList:[
              {title:'Group1'},
              {title:'Group2'},
              {title:'Group3'},
              {title:'Group4'},
              {title:'Group5'},
              {title:'Group6'},
              {title:'Group7'},
            ],

        }
    },

    mounted() {
      this.load_list(this.$route.params.id);
    },

    methods: {
      load_list(filter) {
        this.teamList=[];
        let formData=new FormData();
        formData.append('username',localStorage.getItem('token'));
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        var _this=this;
        axios.post('http://localhost:5000/api/mygroup/',formData, config)
          .then(function (response)  {
            for (let index = 0; index < response.data.length; index++) {
              let confirmData=new FormData();
              confirmData.append('username',localStorage.getItem('token'));
              confirmData.append('groupid',response.data[index].groupid);
              axios.post('http://localhost:5000/api/groupiscreatedbyme/',confirmData,config)
                .then(function(responseMsg) {
                  if((responseMsg.data.message=='success'&&filter=='founded-team')||(responseMsg.data.message=='fail'&&filter=='joined-team')) {
                    _this.teamList.push(response.data[index]);
                  }
                }).catch(error=> {
                  console.log('error',error);
                })
            }
          })
          .catch(function (error) {
             console.log("fail", error)
          });
      }
    }
}
</script>
