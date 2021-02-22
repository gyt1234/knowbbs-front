<template>
  <div>
    <el-card>
      <div class="login-header">
        <div class="login-title">欢迎注册成为知也会员</div>
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="registerFormRef" label-width="100px" class="register_form" :model="registerForm" :rules="registerFormRules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="registerForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPwd" label="确认密码">
          <el-input v-model="registerForm.confirmPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="resetRegisterForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    const validateConfirmPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 登录表单绑定对象
      registerForm: {
        username: '',
        password: '',
        confirmPwd: ''
      },
      // 注册表单的验证规则对象
      registerFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        // 确定密码是否合法
        confirmPwd: [
          { validator: validateConfirmPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 注册逻辑
    register() {

    },
    // 点击重置按钮,重置登录表单
    resetRegisterForm () {
      this.$refs.registerFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-card{
  border-radius: 0;
  border: none;
}
::v-deep{
  .el-card__body{
    padding: 0;
  }
  .el-input__icon{
    height: 130%;
  }
}
.login-header{
  border-bottom: 1px solid #ededed;
  .login-title{
    color: #666;
    font-size: 16px;
    font-weight: 700;
    padding: 10px 15px;
  }
}
.el-form{
  padding: 30px;
}
.el-input{
  width: 50%;
}
.el-select{
  width: 400px;
}
</style>
