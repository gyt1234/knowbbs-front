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
        <div class="code-zone">
          <el-form-item prop="code" label="验证码">
            <el-input v-model="loginForm.code" class="code"></el-input>
          </el-form-item>
          <div class="login-code" @click="refreshCode">
            <s-identify :identify-code="identifyCode"/>
          </div>
        </div>
        <el-form-item label="自动登录">
          <el-select v-model="loginForm.expire">
            <el-option label="1小时内" value="3600"></el-option>
            <el-option label="1天内" value="86400"></el-option>
            <el-option label="3天内" value="259200"></el-option>
            <el-option label="30天内" value="2592000"></el-option>
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
import SIdentify from '@/components/SIdentify'
export default {
  name: 'Login',
  components: {
    SIdentify
  },
  data() {
    const validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'))
      } else if (value !== this.identifyCode) {
        callback(new Error('验证码有误!'))
      } else {
        callback()
      }
    }
    return {
      // 登录表单绑定对象
      loginForm: {
        username: '',
        password: '',
        expire: '3600',
        // text中的验证码
        code: ''
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
        ],
        // 验证码是否合法
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      },
      identifyCodes: '1234567890',
      // 随机出现的验证码
      identifyCode: ''
    }
  },
  created() {
    this.refreshCode()
  },
  mounted() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 登录逻辑
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('front/login.php', this.loginForm)
        if (res.code !== 200) {
          this.$message.error('登录失败,请先注册')
          this.$router.push('/register')
        } else {
          this.$message.success('登录成功')
          this.$router.push('/home')
          window.sessionStorage.setItem('uname', res.username)
        }
      })
    },
    // 点击重置按钮,重置登录表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
      console.log(this.identifyCode)
    }
  }
}
</script>

<style lang="less" scoped>
.code-zone{
  display: flex;
}
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
/*验证码样式*/
.code{
  width:124px;
  height:31px;
}
.login-code{
  cursor: pointer;
  height: 42px;
  margin-top: 5px;
}
</style>
