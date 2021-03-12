<template>
  <div>
    <div>
      <div v-html="reply.content" class="reply-content"></div>
      <div class="reply-operation">
        <div class="reply-name" @click="goUser(reply.uid)">作者：{{reply.uname}}</div>
        <span class="divider">|</span>
        <div>评论时间：{{reply.create_time}}</div>
        <span class="divider">|</span>
        <div class="reply-icon" @click="goQuote(contentId, reply.id)">回复</div>
        <div v-show="reply.uname === username">
          <span class="divider">|</span>
          <span class="reply-icon" @click="deleteContentById(reply.id)">删除</span>
        </div>
        <span class="divider">|</span>
        <div class="reply-quote" @click="getQuote(reply.id)">查看剩余评论</div>
      </div>
    </div>
    <!-- 引用评论区 -->
    <div v-if="quoteList">
      <div class="quote-zone" v-for="(quote,index) in quoteList" :key="index">
        <div class="quote-operation">
          <div class="quote-name" @click="goUser(quote.uid)">作者：{{quote.uname}}</div>
          <span class="divider">|</span>
          <div>评论时间：{{quote.create_time}}</div>
          <div v-show="quote.uname === username">
            <span class="divider">|</span>
            <span @click="deleteContentById(quote.id)" class="quote-icon">删除</span>
          </div>
        </div>
        <div class="quote-content" v-html="quote.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Quote',
  props: {
    reply: Object,
    contentId: String
  },
  data() {
    return {
      username: '',
      // 引用回复列表
      quoteList: [],
      // 当前引用的回复id
      quote_id: ''
    }
  },
  created() {
    this.username = window.sessionStorage.getItem('uname')
  },
  methods: {
    // 获取该回复的引用评论
    async getQuote(id) {
      this.quote_id = id
      const { data: res } = await this.$http.get('front/get_quote.php', { params: { replyId: id } })
      this.quoteList = res
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
      this.$emit('getReplyList')
      await this.getQuote(this.quote_id)
    },
    // 跳转到引用回复页面
    goQuote(id, replyId) {
      this.$router.push({ name: 'Quote', params: { id: id, replyId: replyId } })
    }
  }
}
</script>

<style lang="less" scoped>
.divider{
  padding: 0 5px;
}
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
.quote-zone{
  border-top: 1px dashed #e4e4e4;
  margin: 10px 15px 10px 100px;
  padding-left: 20px;
  .quote-operation{
    display: flex;
    justify-content: flex-end;
    color: rgb(136,136,136);
    font-size: 13px;
    .quote-icon{
      cursor: pointer;
    }
    .quote-name{
      cursor: pointer;
    }
  }
  .quote-content{

  }
}
</style>
