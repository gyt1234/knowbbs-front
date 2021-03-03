<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>回复帖子</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always" class="box-card">
      <div class="title-zone">回复：{{contentInfo.username}} 发布的 {{contentInfo.title}}</div>
      <el-form ref="replyFormRef" :model="replyForm" :rules="replyFormRules">
        <el-form-item prop="content">
          <el-input type="textarea" :rows="10" placeholder="请输入回复信息" v-model="replyForm.content">
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="reply">回复</el-button>
          <el-button type="info" @click="resetReplyForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Reply',
  data() {
    return {
      // 表单绑定对象
      replyForm: {
        content: '',
        content_id: '',
        user_id: ''
      },
      // 表单的验证规则对象
      replyFormRules: {
        // 验证码是否合法
        content: [
          { required: true, message: '请输入回复内容', trigger: 'blur' }
        ]
      },
      // 帖子信息
      contentInfo: {}
    }
  },
  created () {
    this.replyForm.content_id = this.$route.params.id
    this.getContentInfo()
  },
  methods: {
    // 回帖逻辑
    reply() {
      this.$refs.replyFormRef.validate(async valid => {
        if (!valid) return
        if (!window.sessionStorage.getItem('uname')) {
          this.$message.error('请先登录再发布帖子')
          this.$router.push('/login')
        } else {
          this.replyForm.user_id = window.sessionStorage.getItem('uid')
          this.replyForm.content = this.replyForm.content.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
          const { data: res } = await this.$http.post('front/reply.php', this.replyForm)
          if (res.code === 500) {
            this.$message.error('回复失败')
          } else {
            this.$message.success('回复成功')
            this.$router.go(-1)
          }
        }
      })
    },
    // 点击重置按钮,重置表单
    resetReplyForm () {
      this.$refs.replyFormRef.resetFields()
    },
    // 获取帖子信息
    async getContentInfo() {
      const { data: res } = await this.$http.get('front/content.php', { params: { contentId: this.replyForm.content_id } })
      this.contentInfo = res
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb{
  padding-left: 20px;
  background: url(../assets/index_icon.png) 0px -60px no-repeat !important;
  font-size: 14px;
  margin-bottom: 10px;
}
.box-card{
  padding: 0 0 20px;
}
.el-card, .el-message{
  border-radius: 0;
  border: none;
}
.title-zone{
  font-size: 13px;
  margin-bottom: 10px;
}
</style>
