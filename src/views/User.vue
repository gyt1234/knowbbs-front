<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <div class="card-zone">
      <el-card class="box-card">
        <div class="son-box">
          <div class="son-item" v-for="(content,index) in contentList" :key="index">
            <div class="img-zone">
              <a><img src="../assets/user_default.jpg"/></a>
            </div>
            <div class="content-zone">
              <div class="content-title">
                <span class="title" @click="goContent(content.id)">{{content.title}}</span>
              </div>
              <div class="content-info">
                <span>楼主：{{content.username}}</span>
                <span>{{content.create_time}}</span>
              </div>
            </div>
            <div class="count-zone">
              <div class="count-total">
                <p>浏览</p>
                <p>{{content.times}}</p>
              </div>
              <div class="count-total">
                <p>回复</p>
                <p>{{content.comments}}</p>
              </div>
            </div>
            <div class="icon-zone" v-show="content.username === username">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <i class="el-icon-edit-outline" @click="goUpdateContent(content.id)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <i class="el-icon-delete" @click="deleteContentById(content.id)"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="topic-button">
          <!-- 分页功能 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userNum"
            background
          >
          </el-pagination>
        </div>
      </el-card>
      <div class="right-zone">
        <div><img src="../assets/user_default.jpg" /></div>
        <div class="bottom-zone">
          <div class="username">{{userInfo.name}}</div>
          <div>帖子总计：{{userNum}}</div>
          <div>
            操作：
            <span class="operation" @click="showPhotoVisible = true">修改头像</span>
            <span class="divider">|</span>
            <span class="operation" @click="showPassVisible = true">修改密码</span>
          </div>
        </div>
      </div>
    </div>
    <!--修改头像对话框-->
    <el-dialog title="更换头像" :visible.sync="showPhotoVisible" width="40%">
      <div>原头像：</div>
      <div class="img-update"><img src="../assets/user_default.jpg"/></div>
      <input type="file" name="photo" id="photo"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updatePhoto">确 定</el-button>
       <el-button @click="showPhotoVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--修改密码对话框-->
    <el-dialog title="修改密码" :visible.sync="showPassVisible" width="40%">
      <el-form ref="passFormRef" label-width="100px" :model="passForm" :rules="passFormRules">
        <el-form-item prop="oldPass" label="原密码：">
          <el-input type="password" v-model="passForm.oldPass" placeholder="请输入原密码"/>
        </el-form-item>
        <el-form-item prop="newPass" label="新密码：">
          <el-input type="password" v-model="passForm.newPass" placeholder="请输入新密码"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updatePass">确 定</el-button>
       <el-button @click="showPassVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      // 获取帖子列表的参数对象
      queryInfo: {
        user_id: '',
        pagenum: 1, // 当前的页数
        pagesize: 5 // 当前每页显示多少条数据
      },
      // 用户发帖总数
      userNum: 0,
      // 用户id
      user_id: '',
      // 当前登录的用户名
      username: '',
      // 该用户发布的帖子列表
      contentList: [],
      // 修改头像的对话框的显示与隐藏
      showPhotoVisible: false,
      // 修改密码的对话框的显示与隐藏
      showPassVisible: false,
      // 修改密码表单
      passForm: {
        oldPass: '',
        newPass: '',
        user_id: ''
      },
      // 修改密码表单规则
      passFormRules: {
        oldPass: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      // 用户信息
      userInfo: {}
    }
  },
  created() {
    this.user_id = this.$route.params.id
    this.queryInfo.user_id = this.$route.params.id
    this.username = window.sessionStorage.getItem('uname')
    this.getContentByUserId()
    this.getUserInfo()
    this.getUserNum()
  },
  methods: {
    // 修改头像逻辑
    async updatePhoto() {
      const uImg = document.getElementById('photo').files
      const formdata = new FormData()
      formdata.append('id', this.user_id)
      formdata.append('uImg', uImg[0])
      const { data: res } = await this.$http.post('front/update_photo.php', formdata)
      if (res.code === 200) {
        this.$message.success('头像更新成功')
      } else {
        this.$message.error('头像更新失败')
      }
      this.showPhotoVisible = false
    },
    // 根据用户id获取用户信息
    async getUserInfo() {
      const { data: res } = await this.$http.get('front/get_user.php', { params: { user_id: this.user_id } })
      this.userInfo = res
    },
    // 修改密码逻辑
    async updatePass() {
      this.$refs.passFormRef.validate(async valid => {
        if (!valid) return
        if (this.passForm.oldPass === window.sessionStorage.getItem('pw')) {
          this.passForm.user_id = this.user_id
          const { data: res } = await this.$http.post('front/update_pass.php', this.passForm)
          if (res.code === 200) {
            this.$message.success('修改密码成功')
          } else {
            this.$message.error('修改密码失败')
          }
          this.showPassVisible = false
        } else {
          this.$message.error('请输入正确的原密码')
        }
      })
    },
    // 获取该用户下面的所有帖子
    async getContentByUserId() {
      const { data: res } = await this.$http.get('front/content_by_user.php', { params: this.queryInfo })
      this.contentList = res
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getContentByUserId()
    },
    // 监听 页码 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getContentByUserId()
    },
    // 获取该用户发帖总数
    async getUserNum() {
      const { data: res } = await this.$http.get('front/userNum.php', { params: { id: this.user_id } })
      this.userNum = Number(res.count_all)
    },
    // 跳转到帖子详情页
    goContent(id) {
      this.$router.push({ name: 'Content', params: { id: id } })
    },
    // 跳转到帖子编辑页面
    goUpdateContent(id) {
      this.$router.push({ name: 'UpdateContent', params: { id: id } })
    },
    // 通过帖子id删帖
    async deleteContentById(id) {
      // 弹框询问是否删除
      const confirmResult = await this.$confirm('此操作将永久删除该帖子, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果确认删除 则返回值为字符串 confirm
      // 如果取消删除 则返回值为字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消了删除！')
      }
      const { data: res } = await this.$http.get('front/delete_content.php', { params: { id: id } })
      if (res.code === 500) {
        return this.$message.error('删除帖子失败！')
      }
      this.$message.success('删除帖子成功！')
      this.getContentByUserId()
    }
  }
}
</script>

<style lang="less" scoped>
.img-update{
  margin-bottom: 10px;
  img{
    width: 200px;
    height: 200px;
  }
}
.card-zone{
  display: flex;
  background: rgba(252,252,252,1);
}
.box-card{
  width: 68%;
  padding: 0 0 20px;
}
.el-card, .el-message{
  border-radius: 0;
  border: none;
}
.topic-button{
  margin-top: 10px;
}
.son-item:first-child{
  border-top: 1px dashed #e5e5e5;
}
.son-item{
  display: flex;
  padding: 15px 0;
  border-bottom: 1px dashed #e5e5e5;
  position: relative;

  .img-zone{
    margin-right: 10px;
    img{
      width: 45px;
      height: 45px;
    }
  }
  .content-zone{
    .content-title{
      color: #105cb6;
      font-size: 14px;
      padding-bottom: 10px;
      span{
        display: inline-block;
        padding-right: 10px;
      }
      .title{
        font-weight: bold;
        cursor: pointer;
      }
    }
    .content-info{
      color: #999999;
      font-size: 13px;
      span{
        display: inline-block;
        margin-right: 5px;
      }
    }
  }
  .count-zone{
    display: flex;
    position: absolute;
    right: 0;
    .count-total{
      background: #f4f4f4;
      border-radius: 3px;
      height: 36px;
      margin: 0 0 0 10px;
      //overflow: hidden;
      padding: 4px 0;
      width: 54px;
      p{
        font-size: 13px;
        color: #999;
        line-height: 18px;
        text-align: center;
        margin: 0;
        padding: 0;
      }
    }
  }
}
.right-zone{
  margin: 20px auto 0 auto;
  .bottom-zone{
    margin-top: 5px;
    div{
      font-size: 13px;
      line-height: 150%;
    }
    .username{
      //font-weight: bold;
      font-size: 22px;
      line-height: 140%;
      padding: 5px 0 10px 0;
    }
    .divider{
      padding: 0 5px;
    }
    .operation{
      cursor: pointer;
    }
    .operation:hover{
      color: red;
    }
  }
}
.icon-zone{
  position: absolute;
  top: 40px;
  right: 120px;
  .el-icon-edit-outline,
  .el-icon-delete{
    cursor: pointer;
    font-size: 20px;
    color: rgba(72,143,206,1);
    margin-right: 8px;
  }
}
/*分页按钮样式*/
::v-deep{
  .el-pagination button, .el-pagination span:not([class*=suffix]){
    line-height: 52px;
  }
  .el-pagination .btn-prev{
    margin-top: 12px;
  }
  .el-pagination .btn-next{
    margin-top: 12px;
  }
  .el-pager{
    margin-top: 12px;
  }
  .btn-next{
    margin-top: 10px;
  }
}
</style>
