<template>
  <div>
    <el-card>
      <div class="login-header">
        <div class="login-title">欢迎登录</div>
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" label-width="100px" class="login_form" :model="loginForm" :rules="loginFormRules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="自动登录">
          <el-select v-model="loginForm.expire">
            <el-option label="1小时内" value="1"></el-option>
            <el-option label="1天内" value="24"></el-option>
            <el-option label="3天内" value="3"></el-option>
            <el-option label="30天内" value="30"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // 登录表单绑定对象
      loginForm: {
        username: '',
        password: '',
        expire: '1小时内'
      },
      // 登录表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录逻辑
    login() {

    },
    // 点击重置按钮,重置登录表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
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
