<template>
  <div>
    <a-card style="height: 610px;">
      <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
      </quill-editor>
    </a-card>
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
        content: "<p> 胡鹏飞真的帅</p>",
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
        axios.post('http://localhost:5000/api/get_doccontent',formData, config)
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
      }
    }
  }

</script>

<style scoped>
</style>