<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{contentInfo && contentInfo.father_name}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{contentInfo && contentInfo.son_name}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{contentInfo && contentInfo.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content-zone">
      <div class="top-zone">
        <el-button type="primary" @click="goReply(contentId)">回复</el-button>
      </div>
      <div class="center-zone">
        <div class="left-zone">
          <img src="../assets/user_default.jpg" @click="goUser(contentInfo.uid)"/>
          <div class="username">{{contentInfo && contentInfo.username}}</div>
        </div>
        <div class="right-zone">
          <div class="title-zone">
            <div class="content-title">{{contentInfo && contentInfo.title}}</div>
            <div class="comment">
              <span>阅读：{{contentInfo && contentInfo.times}}</span>
              <span class="divider">|</span>
              <span>回复：{{contentInfo && contentInfo.comments}}</span>
            </div>
          </div>
          <div class="time">
            <div>发布于：{{contentInfo && contentInfo.create_time}}</div>
            <div class="lz">楼主</div>
          </div>
          <div class="article" v-html="contentInfo.content"></div>
        </div>
      </div>
      <!--评论区-->
      <div class="center-zone" v-for="(reply,index) in replyList" :key="index">
        <div class="left-zone">
          <img src="../assets/user_default.jpg" @click="goUser(reply.uid)"/>
          <div class="username">{{reply.uname}}</div>
        </div>
        <div class="right-zone">
          <div class="time">
            <div>评论时间：{{reply.create_time}}</div>
            <div class="comment">
<!--              <span>1楼</span>-->
<!--              <span class="divider">|</span>-->
<!--              <span style="cursor: pointer">引用</span>-->
<!--              <span class="divider">|</span>-->
              <span v-show="reply.uname === username ? true : false">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <i class="el-icon-delete" @click="deleteContentById(reply.id)"></i>
                </el-tooltip>
              </span>
            </div>
          </div>
          <div class="article" v-html="reply.content"></div>
        </div>
      </div>
      <div class="top-zone">
        <el-button type="primary" @click="goReply(contentId)">回复</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data() {
    return {
      // 帖子Id
      contentId: '',
      // 帖子信息
      contentInfo: {},
      // 回帖列表
      replyList: [],
      // 当前登录的用户名
      username: ''
    }
  },
  async created() {
    this.contentId = this.$route.params.id
    this.username = window.sessionStorage.getItem('uname')
    this.getContentInfo()
    this.getReplyList()
  },
  methods: {
    // 获取帖子信息
    async getContentInfo() {
      const { data: res } = await this.$http.get('front/content.php', { params: { contentId: this.contentId } })
      this.contentInfo = res
    },
    // 点击跳转到回复页面
    goReply(id) {
      this.$router.push({ name: 'Reply', params: { id: id } })
    },
    // 获取帖子回复列表
    async getReplyList() {
      const { data: res } = await this.$http.get('front/get_reply.php', { params: { contentId: this.contentId } })
      this.replyList = res
    },
    // 点击跳转到个人中心
    goUser(id) {
      this.$router.push({ name: 'User', params: { id: id } })
    },
    async deleteContentById(id) {
      // 弹框询问是否删除
      const confirmResult = await this.$confirm('此操作将永久删除该回复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果确认删除 则返回值为字符串 confirm
      // 如果取消删除 则返回值为字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消了删除！')
      }
      const { data: res } = await this.$http.get('front/delete_reply.php', { params: { id: id } })
      if (res.code === 500) {
        return this.$message.error('删除回复失败！')
      }
      this.$message.success('删除回复成功！')
      this.getReplyList()
    }
  }
}
</script>

<style lang="less" scoped>
.center-zone{
  background-color: rgba(251,251,251,1);
  display: flex;
  margin-bottom: 10px;
  .left-zone{
    padding: 20px 0;
    width: 17%;
    border-right: 1px solid #e9e9e9;
    text-align: center;
    img{
      width: 120px;
      height: 120px;
      cursor: pointer;
    }
    .username{
      font-size: 13px;
      font-weight: bold;
      color: #333333;
      cursor: pointer;
      padding-top: 5px;
    }
  }
  .right-zone{
    background-color: #ffffff;
    padding: 15px 20px;
    width: 81%;
    .title-zone{
      border-bottom: 1px dashed #dddddd;
      display: flex;
      justify-content: space-between;
      .content-title{
        font-weight: bold;
        padding-bottom: 12px;
      }
      .comment{
        font-size: 13px;
        color: #999999;
      }
    }
    .time{
      margin: 10px 0 30px 0;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #666666;
      .lz{
        color: red;
      }
    }
    .article{
      color: #333333;
      font-size: 14px;
      line-height: 180%;
    }
  }
}
.top-zone{
  margin: 0 0 10px 0;
  text-align: right;
}
.el-button{
  height: 37px;
  width: 70px;
}
.divider{
  padding: 0 5px;
}
.el-icon-delete{
  font-size: 20px;
  color: rgba(72,143,206,1);
  cursor: pointer;
}
</style>
