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
        <div class="code-zone">
          <el-form-item prop="code" label="验证码">
            <el-input v-model="registerForm.code" class="code"></el-input>
          </el-form-item>
          <div class="login-code" @click="refreshCode">
            <s-identify :identify-code="identifyCode"/>
          </div>
        </div>
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="resetRegisterForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import SIdentify from '@/components/SIdentify'
export default {
  name: 'Register',
  components: {
    SIdentify
  },
  data() {
    const validateConfirmPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
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
      registerForm: {
        username: '',
        password: '',
        confirmPwd: '',
        // text中的验证码
        code: ''
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
    // 注册逻辑
    register() {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('front/register.php', this.registerForm)
        if (res.code !== 200) {
          this.$message.error('注册失败,请直接登录')
          this.$router.push('/login')
        } else {
          this.$message.success('注册成功')
          this.$router.push('/home')
          window.sessionStorage.setItem('uname', res.username)
        }
      })
    },
    // 点击重置按钮,重置登录表单
    resetRegisterForm () {
      this.$refs.registerFormRef.resetFields()
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
