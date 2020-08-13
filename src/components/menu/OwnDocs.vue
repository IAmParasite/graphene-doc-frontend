<template>
    <div>
        
    <a-list :grid="{ gutter: 25, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item">
      
      <a-card hoverable style="width: 190px" :title="item.title">
    <img
      slot="cover"
      alt="example"
      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      @click="toDocs(item.id)"
    />
    <template slot="actions" class="ant-card-actions">
      <a-icon type="delete" @click="deleteDocs(item)"/>
      <a-icon type="edit" @click="showModal(item)"/>
      <a-icon key="ellipsis" type="ellipsis" />
    </template>
    <a-card-meta :title="item.created_time" :description="item.description">
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
    </a-card-meta>
  </a-card>
    </a-list-item>
  </a-list>
      <div>
      <a-modal
          title="Title"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          @cancel="handleCancel"
        >
        <template> 
          <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="文档标题">
              <a-input v-model="form.title" />
            </a-form-model-item>
            <a-form-model-item label="描述">
              <a-input v-model="form.description" />
            </a-form-model-item>
          </a-form-model>
        </template>
        <p>{{ ModalText }}</p>
      </a-modal>
      </div>
    </div>
    
</template>
<script type="text/ecmascript-6">
import axios from 'axios'
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
        data(){
            return {
                data,
                ModalText: 'Content of the modal',
                visible: false,
                confirmLoading: false,
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
                form: {
                  title: "标题1",
                  description: "描述"
                },
                DocumentID: {
                  type: Number,
                }
            }
        },
        methods: {
          showModal(item) {
            console.log(item)
            console.log("DocumentID = " + item.id)
            this.data.DocumentID = item.id 
            console.log("保存的文档id" + this.data.DocumentID)
            var _this = this;
            let formData = new FormData();
            formData.append('DocumentID', item.id)
            let config = {
                headers: {
              'Content-Type': 'multipart/form-data'
              }
            };
            axios.post('url', formData, config)
              .then(function(response) {
                if(response) {
                  _this.form.title = response.data.title;
                  _this.form.description = response.data.description
                }
                else {
                  alert("请先登录");
                }
              }).catch(function(error) {
                console.log('wrong', error);
              });
            this.visible = true;
          },
          handleOk(e) {
            this.ModalText = 'The modal will be closed after two seconds';
            this.confirmLoading = true;
            
            var _this = this;
            let formData = new FormData();
            formData.append('DocumentID', this.data.DocumentID);
            formData.append('new_title', this.form.title);
            formData.append('new_description', this.form.description);
            let config = {
                headers: {
              'Content-Type': 'multipart/form-data'
              }
            };
            axios.post('url', formData, config)
              .then(function(response) {
                if(response) {
                  console.log("修改成功")
                }
                else {
                  alert("请先登录");
                }
              }).catch(function(error) {
                console.log('wrong', error);
              });
            
            setTimeout(() => {
              this.visible = false;
              this.confirmLoading = false;
            }, 2000);

          },
          handleCancel(e) {
            console.log('Clicked cancel button');
            this.visible = false;
          },
          toDocs(id) {
            //这边判断是否能看，比如occupied
            this.$router.push('/docs2/'+id);
          },
          deleteDocs(item){
              console.log("删除该项" + item.id)
              this.data.splice(item, 1)
              var _this = this
              let formData = new FormData();
              formData.append('DocumentID', item.id);
              formData.append('username', localStorage.getItem('token'));
              console.log(localStorage.getItem('token'))
              let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            };
            axios.post('http://localhost:5000/api/recycle_doc/',formData, config)
          .then(function (response)  {
              console.log(response.data.message)
                if (response.data.message == "success") {
                    console.log("删除程坤")
                }
                else {
                    console.log("删除失败")
                }
            })
            .catch(function (error) {
              console.log("Fail", error)
            });
          }
        },
        mounted(){
            var _this=this;
            let formData = new FormData();
            formData.append('username', localStorage.getItem('token'));
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            axios.post('http://localhost:5000/api/my_created_docs/',formData,config)
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
    }
</script>
<style>
</style>
