<template>
    <div>
        <a-list :grid="{ gutter: 25, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }" :data-source="teamList">
    <a-list-item slot="renderItem" slot-scope="item"  >
      
      <a-card hoverable style="width: 190px" :title="item.title" @click="toGroupDocs($event)" :id="item.index">
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
export default {
    data(){
        return {
            teamList:[
              {title:'Group111',index:'1'},
              {title:'Group2',index:'2'},
              {title:'Group3',index:'3'},
              {title:'Group4',index:'4'},
              {title:'Group5',index:'5'},
              {title:'Group6',index:'6'},
              {title:'Group7',index:'7'},
            ],

        }
    },

    mounted() {
      this.load_list(this.$route.params.id);
    },

    methods: {
      toGroupDocs(e){
        console.log(e);
        this.$router.push('/teamdocs-list/'+e.currentTarget.id);
      },
      load_list(id) {
        switch(id) {
          case 'founded-team': {
            this.teamList.push({title:'Founded Team'});
            break;
          }
          case 'joined-team': {
            this.teamList.push({title:'Joined Team'});
          }
        }
      }
    }
}
</script>