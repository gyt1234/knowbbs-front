<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布帖子</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always" class="box-card">
      <el-form ref="publishFormRef" label-width="100px" class="login_form" :model="publishForm" :rules="publishFormRules">
        <el-form-item prop="module_id" label="所属板块">
          <el-select v-model="publishForm.module_id" placeholder="请选择一个子板块">
            <el-option-group
              v-for="group in options3"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.id"
                :label="item.module_name"
                :value="item.id">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item prop="title" label="标题">
          <el-input v-model="publishForm.title"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="publishForm.content">
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button v-if="routeName === 'UpdateContent'" type="primary" @click="updateContent">发帖</el-button>
          <el-button v-else type="primary" @click="publish">发帖</el-button>
          <el-button type="info" @click="resetPublishForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Publish',
  data() {
    return {
      // 发帖表单绑定对象
      publishForm: {
        module_id: '',
        title: '',
        content: '',
        user_id: ''
      },
      // 登录表单的验证规则对象
      publishFormRules: {
        module_id: [
          { required: true, message: '请选择子版块', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入帖子标题', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        // 验证码是否合法
        content: [
          { required: true, message: '请输入帖子内容', trigger: 'blur' }
        ]
      },
      fatherId: '',
      sonId: '',
      fatherName: '',
      // 下拉菜单
      options3: [],
      // 当前修改的帖子id
      contentId: '',
      routeName: ''
    }
  },
  created() {
    this.routeName = this.$route.name
    console.log(this.routeName)
    if (this.$route.name === 'PublishFather') {
      this.fatherId = this.$route.params.fatherId
      this.getContentByFatherId()
    } else if (this.$route.name === 'PublishSon') {
      this.sonId = this.$route.params.sonId
      this.handleBoards()
    } else {
      this.contentId = this.$route.params.id
      this.handleBoards()
      this.getContentInfo()
    }
  },
  methods: {
    // 根据帖子id获取帖子信息
    async getContentInfo() {
      const { data: res } = await this.$http.get('front/content.php', { params: { contentId: this.contentId } })
      this.publishForm.module_id = res.sonId
      this.publishForm.title = res.title
      this.publishForm.content = res.content
    },
    // 修改帖子
    updateContent() {
      this.$refs.publishFormRef.validate(async valid => {
        if (!valid) return
        if (!window.sessionStorage.getItem('uname')) {
          this.$message.error('请先登录再修改帖子')
          this.$router.push('/login')
        } else {
          this.publishForm.contentId = this.contentId
          this.publishForm.content = this.publishForm.content.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
          const { data: res } = await this.$http.post('front/update_content.php', this.publishForm)
          if (res.code === 500) {
            this.$message.error('编辑失败')
          } else {
            this.$message.success('编辑成功')
            this.$router.push('/index')
          }
        }
      })
    },
    // 发帖逻辑
    publish() {
      this.$refs.publishFormRef.validate(async valid => {
        if (!valid) return
        if (!window.sessionStorage.getItem('uname')) {
          this.$message.error('请先登录再发布帖子')
          this.$router.push('/login')
        } else {
          this.publishForm.user_id = window.sessionStorage.getItem('uid')
          this.publishForm.content = this.publishForm.content.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
          const { data: res } = await this.$http.post('front/publish.php', this.publishForm)
          if (res.code === 500) {
            this.$message.error('发布失败')
          } else {
            this.$message.success('发布成功')
            this.$router.push('/index')
          }
        }
      })
    },
    // 点击重置按钮,重置表单
    resetPublishForm () {
      this.$refs.publishFormRef.resetFields()
    },
    // 根据父板块id获取父板块下面的所有的子版块
    async getContentByFatherId() {
      const { data: res } = await this.$http.get('front/father.php', { params: { fatherId: this.fatherId } })
      this.fatherName = res[0].father_module_name
      const obj1 = {}
      obj1.label = res[0].father_module_name
      obj1.options = res
      this.options3.push(obj1)
    },
    // 将所有的板块分类
    async handleBoards() {
      const { data: res } = await this.$http.get('admin/son.php')
      const tempArr = []
      const newArr = []
      for (let i = 0; i < res.length; i++) {
        if (tempArr.indexOf(res[i].father_module_name) === -1) {
          newArr.push({
            label: res[i].father_module_name,
            // options: [[res[i].module_name, res[i].id]],
            options: [{
              id: res[i].id,
              module_name: res[i].module_name
            }]
          })
          tempArr.push(res[i].father_module_name)
        } else {
          for (let j = 0; j < newArr.length; j++) {
            if (newArr[j].label === res[i].father_module_name) {
              newArr[j].options.push(
                {
                  id: res[i].id,
                  module_name: res[i].module_name
                }
              )
              break
            }
          }
        }
      }
      this.options3 = newArr
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
  //width: 68%;
  padding: 0 0 20px;
}
.el-card, .el-message{
  border-radius: 0;
  border: none;
}
::v-deep{
  .el-input__icon{
    height: 130%;
  }
}
</style>
