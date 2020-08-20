<template>
  <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules">
    <a-form-model-item has-feedback prop="email" style="marginBottom:0"  :wrapper-col="wrapperCol">
      <a-input  v-model="ruleForm.email" style="margin-top:30px">
          <a-icon slot="prefix" type="mail" />
      </a-input>
    </a-form-model-item>

    <a-form-model-item has-feedback prop="username" style="marginBottom:0" :wrapper-col="wrapperCol">
      <a-input  v-model="ruleForm.username" style="margin-top:30px">
          <a-icon slot="prefix" type="user" />
      </a-input>
    </a-form-model-item>

    <a-form-model-item has-feedback prop="pass" style="marginBottom:0" :wrapper-col="wrapperCol">
      <a-input-password placeholder="密码" style="margin-top:30px" v-model="ruleForm.pass" autocomplete="off" />
    </a-form-model-item>

    <a-form-model-item has-feedback prop="checkPass" style="marginBottom:0" :wrapper-col="wrapperCol">
      <a-input-password placeholder="确认密码" style="margin-top:30px" v-model="ruleForm.checkPass" autocomplete="off" />
    </a-form-model-item>

    <a-form-model-item has-feedback prop="description" style="marginBottom:0" :wrapper-col="wrapperCol">
      <a-textarea placeholder="个人简介" v-model="ruleForm.description" style="margin-top:30px">
      </a-textarea>
    </a-form-model-item>

    <a-row type="flex" justify="center" style="margin-top:30px;margin-bottom:30px;">
        <a-button type="danger" @click="resetForm('ruleForm')" style="margin-right:33%">放弃修改</a-button>
        <a-button type="primary" @click="changeInfo('ruleForm')">保存修改</a-button>
    </a-row>
  </a-form-model>
</template>

<script>
//import axios from 'axios'
import axios from 'axios'
function myrefresh() {
  window.location.reload();
}
export default {
  name: 'InfoSetting',

  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码！'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码！'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入的密码不匹配！"));
      } else {
        callback();
      }
    };
    let validateusername=(rule,value,callback)=>{
      if(value==''){
        callback(new Error('用户名不能为空！'));
      }else {
        callback();
      }
    };
    let validateemail=(rule,value,callback)=>{
      if(value==''){
        callback(new Error('邮箱不能为空！'));
      }else{
        callback();
      }
    }
    return {
      PreUsername:'',
      ruleForm: {
        pass: '',
        checkPass: '',
        email:'',
        username:'',
        description:'',
      },
      data:{

      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        username:[{ validator: validateusername, trigger: 'change' }],
        email:[{ validator: validateemail, trigger: 'change' }],
      },
     
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      
    };
  },

  methods: {
    successmsg(message) {
      this.$message.success(message);
    },
    errormsg(message) {
      this.$message.error(message);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.username=this.data.username;
      this.ruleForm.checkPass=this.data.password;
      this.ruleForm.pass=this.data.password;
      this.ruleForm.email=this.data.email;
      this.ruleForm.description=this.data.description;
    },
    changeInfo(formName) {
      var _this=this;

      if(this.ruleForm.description.length >12){
        _this.errormsg("简介太长啦")
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = new FormData();
          formData.append('new_username', this.ruleForm.username);
          formData.append('new_password1', this.ruleForm.pass);
          formData.append('new_email', this.ruleForm.email);
          formData.append('username',this.PreUsername);
          formData.append('new_description',this.ruleForm.description);
          let config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          };
          axios.post('http://localhost:5000/api/modify_user_info/',formData,config)
              .then(function (response) {
                  if (response.data.message=="success"){
                    localStorage.setItem('token',_this.ruleForm.username);
                    _this.successmsg("修改成功")
                    setTimeout(() => {
                      myrefresh();
                    }, 2000);
                  }else {
                    _this.errormsg("用户名或邮箱已存在")
                  }
              })
              .catch(function () {
                  _this.errormsg("未知错误，请稍后重试")
              });
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    var _this=this;
    let formData = new FormData();
    this.PreUsername=localStorage.getItem('token');
    formData.append('username', this.PreUsername);
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    axios.post('http://localhost:5000/api/get_user/',formData,config)
      .then(function(response) {
        if(response) {
          _this.ruleForm.username=response.data.username;
          _this.ruleForm.email=response.data.email;
          _this.ruleForm.pass=response.data.password;
          _this.ruleForm.checkPass=response.data.password;
          _this.ruleForm.description=response.data.description;
          _this.data=response.data;
        }else {
          _this.errormsg("请先登录")
        }
    }).catch(function() {
      _this.errormsg("未知错误，请稍后重试")
    });
  }
}
</script>
