<template>
  <a-layout style="min-height:100%">
    <a-layout-content id="card">
      <a-card style="width:400px;height:500px;margin:157px auto;">
        <a-tabs default-active-key="sign in" @change="callback">
          <!-- 登录card -->
          <a-tab-pane key="sign in" tab="登录">
            <!-- 登录表单 -->
            <a-form-model ref="loginForm" :model="loginForm" v-bind="layout">
            <a-input placeholder="用户名" v-model="loginForm.username" style="margin-top:30px">
              <a-icon slot="prefix" type="user" />
            </a-input>
            <a-input-password placeholder="密码"  v-model="loginForm.password" style="margin-top:30px">
              <a-icon slot="prefix" type="info-circle" />
            </a-input-password>
            <a-alert v-show="rightlog.rl" message="登陆成功" type="success" banner/>
            <a-alert v-show="wronglog.wl" type="error" message="用户名或密码错误" banner />
            </a-form-model>
            <a-row type="flex" justify="center" style="margin-top:30px;margin-bottom:30px">
              <a-col :span="11">
                <a-button type="primary" block @click="checklogin()">登录</a-button>
              </a-col>
            </a-row>
          </a-tab-pane>

          <!-- 注册card -->
          <a-tab-pane key="sign up" tab="注册" force-render>
            <!-- 注册表单 -->
            <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
              <a-form-model-item has-feedback prop="email" style="marginBottom:0" :wrapper-col="{span:24}">
                <a-input placeholder="Email" v-model="ruleForm.email" style="margin-top:30px">
                  <a-icon slot="prefix" type="mail" />
                </a-input>
              </a-form-model-item>
              <a-form-model-item has-feedback prop="username" style="marginBottom:0" :wrapper-col="{span:24}">
                <a-input placeholder="用户名" v-model="ruleForm.username" style="margin-top:30px">
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-model-item>
              <a-form-model-item has-feedback prop="pass" style="marginBottom:0" :wrapper-col="{span:24}">
                <a-input-password placeholder="密码" style="margin-top:30px" v-model="ruleForm.pass" autocomplete="off" />
              </a-form-model-item>
              <a-form-model-item has-feedback prop="checkPass" style="marginBottom:0" :wrapper-col="{span:24}">
                <a-input-password placeholder="确认密码" style="margin-top:30px" v-model="ruleForm.checkPass" autocomplete="off" />
              </a-form-model-item>
            </a-form-model>

            <a-row type="flex" justify="center" style="margin-top:30px;margin-bottom:30px">
              <a-col :span="11">
                <a-button type="primary" block @click="signup('ruleForm')">注册</a-button>
              </a-col>
            </a-row>
          </a-tab-pane>

        </a-tabs>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>
<style scoped>
  #card{
   background: url('../assets/aaa.jpg');
   background-size: cover;
}
</style>
<script>
import axios from 'axios'
function myrefresh() {
  window.location.reload();
}
export default {
  name: "login",

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

      wronglog: {
        wl: false,
      },
      
      rightlog: {
        rl: false,
      }
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
          var _this = this
          axios.post('http://localhost:5000/api/regist/',formData,config)
              .then(function (response) {
                  if (response.data.message=="success"){
                    _this.successmessage("注册成功");
                    setTimeout(() => {
                      myrefresh();
                    }, 2000);
                  }
                  else if(response.data.message=="fail"){
                    _this.errormessage("用户名或者邮箱已存在");
                  }
                  else {
                    _this.errormessage("未知错误，请稍后再试")
                  }
              })
              .catch(function () {
                _this.errormessage("未知错误，请稍后再试")
              });
        } else {
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
      var _this = this
      axios.post('http://localhost:5000/api/login/',formData, config)
          .then(function (response)  {
              if (response.data.message!='fail') {
                  _this.wronglog.wl = false;
                  _this.rightlog.rl = true;
                  localStorage.setItem('token',_this.loginForm.username);
                  localStorage.setItem('userid', response.data.id);
                  console.log("用户登录" + localStorage.getItem("userid"));
                  _this.$router.push('/');
                  _this.$router.go(0)
              }else {
                  _this.wronglog.wl=true;
                  _this.rightlog.rl=false;
              }
          })
          .catch(function () {
             _this.errormessage("未知错误，请稍后再试")
          });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>