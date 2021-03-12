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
        <!-- 分页功能 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="allNum"
          background
        >
        </el-pagination>
      </div>
      <div class="center-zone">
        <div class="left-zone">
          <img src="../assets/user_default.jpg" @click="goUser(contentInfo.uid)"/>
          <div class="username">作者：{{contentInfo && contentInfo.username}}</div>
        </div>
        <div class="right-zone">
          <div class="title-zone">
            <div class="content-title">{{contentInfo && contentInfo.title}}</div>
            <div class="comment">
              <span>阅读：{{contentInfo && contentInfo.times}}</span>
              <span class="divider">|</span>
              <span>评论：{{contentInfo && contentInfo.comments}}</span>
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
      <div class="reply-zone" v-for="(reply,index) in replyList" :key="index" v-show="reply.quote_id === '0'">
        <quote :reply="reply" :contentId="contentId" @getReplyList="getReplyList"/>
      </div>
      <div class="top-zone">
        <el-button type="primary" @click="goReply(contentId)">回复</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Quote from '@/components/Quote'
export default {
  name: 'Content',
  components: { Quote },
  data() {
    return {
      // 获取帖子列表的参数对象
      queryInfo: {
        contentId: '',
        pagenum: 1, // 当前的页数
        pagesize: 2 // 当前每页显示多少条数据
      },
      // 帖子Id
      contentId: '',
      // 帖子信息
      contentInfo: {},
      // 回帖列表
      replyList: [],
      // 引用回复列表
      quoteList: [],
      // 当前登录的用户名
      username: '',
      // 所有的回复数目
      allNum: 0
    }
  },
  async created() {
    this.contentId = this.$route.params.id
    this.queryInfo.contentId = this.$route.params.id
    this.addTimes()
    this.getReplyNum()
    this.username = window.sessionStorage.getItem('uname')
    this.getContentInfo()
    this.getReplyList()
  },
  methods: {
    // 获取所有的回复数目
    async getReplyNum() {
      const { data: res } = await this.$http.get('front/num_reply.php', { params: { contentId: this.contentId } })
      this.allNum = Number(res.count)
    },
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
      const { data: res } = await this.$http.get('front/get_reply.php', { params: this.queryInfo })
      this.replyList = res
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getReplyList()
    },
    // 监听 页码 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getReplyList()
    },
    // 点击跳转到个人中心
    goUser(id) {
      if (this.username) {
        this.$router.push({ name: 'User', params: { id: id } })
      } else {
        this.$router.push('/login')
      }
    },
    // 根据回复id删除该回复
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
    },
    // 进入帖子详情页，使得帖子浏览量+1
    async addTimes() {
      await this.$http.get('front/add_times.php', { params: { contentId: this.contentId } })
    },
    // 跳转到引用回复页面
    goQuote(id, replyId) {
      this.$router.push({ name: 'Quote', params: { id: id, replyId: replyId } })
    },
    // 获取该回复的引用评论
    async getQuote(id) {
      const { data: res } = await this.$http.get('front/get_quote.php', { params: { replyId: id } })
      this.quoteList = res
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
  display: flex;
  justify-content: space-between;
}
.el-button{
  height: 37px;
  width: 70px;
  margin-top: 20px;
}
.divider{
  padding: 0 5px;
}
.el-icon-delete,
.el-icon-chat-line-square
{
  font-size: 20px;
  color: rgba(136,136,136,1);
  cursor: pointer;
  line-height: 150%;
  margin-left: 10px;
}
.reply-zone{
  background: #ffffff;
  padding: 15px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 180%;
  color: #333333;

  .reply-operation{
    display: flex;
    justify-content: flex-end;
    color: rgb(136,136,136);
    .reply-name{
      cursor: pointer;
    }
    .reply-icon{
      cursor: pointer;
    }
    .reply-quote{
      color: #0086b3;
      cursor: pointer;
      margin-left: 5px;
    }
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
