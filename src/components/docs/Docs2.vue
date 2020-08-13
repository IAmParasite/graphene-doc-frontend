<template>
  <div class="home">
    <mavon-editor v-model="content" ref="md" @change="change" style="min-height: 600px"/>
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
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from 'axios'
export default {
  name: "Home",
  components: {
    mavonEditor,
  },
  data() {
    return {
      content: "<p> 请在这里开始你的?文档编辑</p>",
      html: "",
      configs: {}
    };
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    // 提交
    save_docs() {
        console.log(this.content)
        console.log(this.$route.params.id)
        let formData = new FormData();
        formData.append('content', this.content);
        formData.append('DocumentID', this.$route.params.id);
        formData.append('username',localStorage.getItem('token'))
        let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        
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
      },
      load_data(id) {
        console.log("Begin load_data" + id)
        let formData = new FormData();
        formData.append('DocumentID', id);
        formData.append('username',localStorage.getItem('token'));
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
  },
  mounted: function() {
      console.log(this.$route.params.id);
      this.load_data(this.$route.params.id);
    },
};
</script>
