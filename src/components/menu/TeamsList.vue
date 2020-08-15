<template>
    <div>
        <a-list :grid="{ gutter: 25, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item">
      
      <a-card hoverable style="width: 190px" :title="item.title" @click="toGroupDocs(item)">
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
    <a-card-meta :title="item.groupname" description="This is the description">
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
import axios from 'axios'
const data= [
  //
  //
  //

];
export default {
    data(){
        return {
          data,
        }
    },

    mounted() {
      this.load_list(this.$route.params.id);
    },

    methods: {
      toGroupDocs(item){
        this.$router.push('/teamdocs-list/' + item.groupid);

        localStorage.setItem('groupInfo'+item.groupid,JSON.stringify(item));
      },

      load_list(id) {
        switch(id) {
          case 'founded-team': {
            //this.teamList.push({title:'Founded Team'});
            this.get_my_founded_teams()
            break;
          }
          case 'joined-team': {
            //this.teamList.push({title:'Joined Team'});
            this.get_my_joined_teams()
            break
          }
        }
      },
      get_my_joined_teams() {
        var _this = this;
        let formData = new FormData();
        formData.append('username', localStorage.getItem('token'));
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        axios.post('http://localhost:5000/api/mygroup/',formData,config)
            .then(function(response) {
                if(response) {
                  _this.data=response.data;
                  console.log(response.data);
                }
                else {
                    alert("请先登录！");
                }
            }).catch(function(error) {
            console.log('wrong',error);
            });
      },
      get_my_founded_teams() {
        var _this = this;
        let formData = new FormData();
        formData.append('username', localStorage.getItem('token'));
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        axios.post('http://localhost:5000/api/group_created_byme/',formData,config)
            .then(function(response) {
                if(response) {
                  _this.data=response.data;
                  console.log(response.data);
                }
                else {
                    alert("请先登录！");
                }
            }).catch(function(error) {
            console.log('wrong',error);
            });
      }
     }
}
</script>
<style>
</style>