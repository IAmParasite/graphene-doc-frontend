<template>
  <a-layout style="min-height:100%">
    <a-layout-content>
      <a-card style="width:300px;margin:100px auto;">
        <a-tabs default-active-key="sign in" @change="callback">

          <a-tab-pane key="sign in" tab="登录">

            <a-input placeholder="用户名" ref="usernameInput" v-model="username" style="margin-top:20px">
              <a-icon slot="prefix" type="user" />
            </a-input>

            <a-input-password placeholder="密码" ref="passwordInput" v-model="password" style="margin-top:20px">
              <a-icon slot="prefix" type="info-circle" />
            </a-input-password>
            <div v-if="errorLogin" style="color:red">用户名或密码错误！</div>

            <a-row type="flex" justify="center" style="margin-top:10px;margin-bottom:30px">
              
              <a-col :span="11">
                <a-button type="primary" block @click="checklogin">登录</a-button>
              </a-col>
            </a-row>
          </a-tab-pane>

          <a-tab-pane key="sign up" tab="注册" force-render>

            <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
              <a-input placeholder="Email" ref="userEmailInput" v-model="email" style="margin-top:20px">
                <a-icon slot="prefix" type="mail" />
              </a-input>
              <div v-if="errorDifferent" style="color:red">email地址不可用！</div>
              

              <a-input placeholder="用户名" ref="usernameInput" v-model="username" style="margin-top:20px">
                <a-icon slot="prefix" type="user" />
              </a-input>
              <div v-if="errorDifferent" style="color:red">用户名不可用！</div>
            
              <a-form-model-item has-feedback prop="pass" style="marginBottom:0"  wrapper-col="span: 20">
                <a-input-password placeholder="密码" style="margin-top:20px" v-model="ruleForm.pass" autocomplete="off" />
              </a-form-model-item>

              <a-form-model-item has-feedback prop="checkPass" style="marginBottom:0" wrapper-col="span: 20">
                <a-input-password placeholder="确认密码" style="margin-top:16px" v-model="ruleForm.checkPass" autocomplete="off" />
              </a-form-model-item>
            </a-form-model>

            <a-row type="flex" justify="center" style="margin-top:20px;margin-bottom:30px">
              <a-col :span="11">
                <a-button type="primary" block @click="signup">注册</a-button>
              </a-col>
            </a-row>

          </a-tab-pane>

        </a-tabs>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script>
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
    return {
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }]
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

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>