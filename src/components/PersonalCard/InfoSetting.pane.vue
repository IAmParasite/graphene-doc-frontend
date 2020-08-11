<template>
  <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
    <a-form-model-item has-feedback prop="email" style="marginBottom:0"  wrapper-col="span: 20">
    <a-input :placeholder="PreEmail" v-model="ruleForm.email" style="margin-top:30px">
        <a-icon slot="prefix" type="mail" />
    </a-input>
    </a-form-model-item>
    <a-form-model-item has-feedback prop="username" style="marginBottom:0"  wrapper-col="span: 20">
    <a-input :placeholder="PreUsername" v-model="ruleForm.username" style="margin-top:30px">
        <a-icon slot="prefix" type="user" />
    </a-input>
    </a-form-model-item>
    <a-form-model-item has-feedback prop="pass" style="marginBottom:0"  wrapper-col="span: 20">
    <a-input-password placeholder="密码" style="margin-top:30px" v-model="ruleForm.pass" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback prop="checkPass" style="marginBottom:0" wrapper-col="span: 20">
    <a-input-password placeholder="确认密码" style="margin-top:30px" v-model="ruleForm.checkPass" autocomplete="off" />
    </a-form-model-item>

    <a-row type="flex" justify="center" style="margin-top:30px;margin-bottom:30px;">
        <a-button type="danger" @click="resetForm('ruleForm')" style="margin-right:33%">放弃修改</a-button>
        <a-button type="primary" @click="changeInfo('ruleForm')">保存修改</a-button>
    </a-row>
  </a-form-model>
</template>

<script>
//import axios from 'axios'
import GLOBAL from '@/components/common/Global.vue'
import axios from 'axios'

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
      PreEmail: GLOBAL.email,
      PreUsername: GLOBAL.username,

      ruleForm: {
        pass: '',
        checkPass: '',
        email:'',
        username:''
      },
      loginForm:{
        username:'',
        password:''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        username:[{ validator: validateusername, trigger: 'change' }],
        email:[{ validator: validateemail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
    };
  },

  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = new FormData();
          formData.append('new_username', this.ruleForm.username);
          formData.append('new_password1', this.ruleForm.pass);
          formData.append('new_email', this.ruleForm.email);
          let config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          };
          axios.post('http://localhost:5000/api/modify_user_info',formData,config)
              .then(function (response) {
                  if (response){
                    console.log(response.data);
                  }else {
                      console.log('wrong')
                  }
              })
              .catch(function (error) {
                  console.log('wrong', error)
              });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<!--
<script>


export default {
  name: "PersonalCard",

  data() {
    //let checkPending;
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
      Global,

      ruleForm: {
        pass: '',
        checkPass: '',
        email:'',
        username:''
      },
      loginForm:{
        username:'',
        password:''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        username:[{ validator: validateusername, trigger: 'change' }],
        email:[{ validator: validateemail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
    };
  },

  methods: {
    callback(key) {
      console.log(key);
    },
    successmessage(msg){
      this.$message.success(msg);
    },
    errormessage(msg){
      this.$message.error(msg);
    },
    signup(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = new FormData();
          formData.append('username', this.ruleForm.username);
          formData.append('password', this.ruleForm.pass);
          formData.append('email', this.ruleForm.email);
          let config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          };
          axios.post('http://localhost:5000/api/regist',formData,config)
              .then(function (response) {
                  if (response){
                    console.log(response.data);
                  }else {
                      console.log('wrong')
                  }
              })
              .catch(function (error) {
                  console.log('wrong', error)
              });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    checklogin(){
      let formData = new FormData();
      formData.append('username', this.loginForm.username);
      formData.append('password', this.loginForm.password);
      let config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      };
      axios.post('http://localhost:5000/api/login',formData, config)
          .then(function (response)  {
              if (response.data.message=='success') {
                  console.log("程坤")
              }else {
                  console.log("失败")
              }
          })
          .catch(function (error) {
             console.log("Fail", error)
          });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },

  components: {
    Global
  }
};
</script>
-->