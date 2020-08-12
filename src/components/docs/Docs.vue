<template>
  <div>
    <div>
      <a-card style="height: 610px;">
        <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
        </quill-editor>
      </a-card>
    </div>
    <div>
      <a-config-provider :auto-insert-space-in-button="false">
        <a-button type="primary" @click="save_docs()">
          保存
        </a-button>
      </a-config-provider>
  </div>
  </div>
</template>

<script>
  import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import axios from 'axios'
  export default {
    name: 'FuncFormsEdit',
    components: {
      quillEditor
    },
    data() {
      return {
        content: "<p> 请在这里开始你的文档编辑</p>",
        editorOption: {}
      }
    },
    mounted: function() {
      console.log(this.$route.params.id);
      this.load_data(this.$route.params.id);
    },
    methods: {
      load_data(id) {
        console.log("Begin load_data" + id)
        let formData = new FormData();
        formData.append('id', id);
        let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
      var _this = this
        axios.post('http://localhost:5000/api/get_doccontent/',formData, config)
          .then(function (response)  {
            console.log(response.data.message)
              if (response.data.message=="success") {
                  console.log("程坤")
                  console.log(response.data.content)
                  _this.content = response.data.content
              }
              else {
                  console.log("失败")
              }
          })
          .catch(function (error) {
             console.log("Fail", error)
          });
      },
      save_docs() {
        console.log(this.content)
        console.log(this.$route.params.id)
        let formData = new FormData();
        formData.append('content', this.content);
        formData.append('DocumentID', this.$route.params.id);
        let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        var _this = this
        axios.post('http://localhost:5000/api/modify_doc/',formData, config)
          .then(function (response)  {
              console.log(response.data.message)
                if (response.data.message == "success") {
                    console.log("程坤")
                }
                else {
                    console.log("失败")
                }
            })
            .catch(function (error) {
              console.log("Fail", error)
            });
      }
    }
  }

</script>

<style scoped>
</style>