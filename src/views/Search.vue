<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>搜索页</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card-zone">
      <!--卡片视图区-->
      <el-card shadow="always" class="box-card">
        <div class="father-box">
          <h3>共有{{queryNum}}条匹配的帖子</h3>
<!--          <div class="topic-button">-->
<!--            <div>分页按钮</div>-->
<!--          </div>-->
        </div>
        <div class="son-box">
          <div class="son-item" v-for="(content,index) in allContents" :key="index">
            <div class="img-zone">
              <a @click="goUser(content.uid)"><img src="../assets/user_default.jpg"/></a>
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
<!--        <div class="topic-button">-->
<!--          <el-button type="primary">发帖</el-button>-->
<!--          <div>分页按钮</div>-->
<!--        </div>-->
      </el-card>
      <!--右侧板块列表区域-->
      <board-list></board-list>
    </div>
  </div>
</template>

<script>
import BoardList from '../components/BoardList.vue'
export default {
  name: 'FatherList',
  components: {
    BoardList
  },
  data() {
    return {
      // 搜索关键词
      query: '',
      // 搜索到的所有帖子列表
      allContents: [],
      // 获取含有关键词的帖子数
      queryNum: 0,
      // 当前登录用户名
      username: ''
    }
  },
  created() {
    this.query = this.$route.params.keywords
    this.username = window.sessionStorage.getItem('uname')
    this.getQueryNum()
    this.getAllContents()
  },
  methods: {
    // 获取含有关键词的帖子数
    async getQueryNum() {
      const { data: res } = await this.$http.get('front/search_num.php', { params: { keywords: this.query } })
      this.queryNum = res.count_all
    },
    // 搜索所有含有关键词的帖子
    async getAllContents() {
      const { data: res } = await this.$http.get('front/search.php', { params: { keywords: this.query } })
      this.allContents = res
    },
    // 点击子版块名称进入子版块列表
    goSonList(id) {
      this.$router.push({ name: 'SonList', params: { id: id } })
    },
    // 跳转到帖子详情页面
    goContent(id) {
      this.$router.push({ name: 'Content', params: { id: id } })
    },
    // 点击跳转到个人中心
    goUser(id) {
      this.$router.push({ name: 'User', params: { id: id } })
    },
    // 跳转到帖子编辑页面
    goUpdateContent(id) {
      this.$router.push({ name: 'UpdateContent', params: { id: id } })
    },
    // 根据帖子id删除对应的帖子
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
      this.getAllContent()
      this.getAllNum()
      this.getTodayNum()
    }
  }
}
</script>

<style lang="less" scoped>
.card-zone{
  display: flex;
  background: rgba(252,252,252,1);
}
.el-breadcrumb{
  padding-left: 20px;
  background: url(../assets/index_icon.png) 0px -60px no-repeat !important;
  font-size: 14px;
  margin-bottom: 10px;
}
.box-card{
  width: 68%;
  padding: 0 0 20px;
}
.el-card, .el-message{
  border-radius: 0;
  border: none;
}
.el-button{
  padding: 8px 20px;
}
.father-box{
  border-bottom: 1px dashed #e5e5e5;
  padding-bottom: 8px;

  h3{
    color: red;
    font-size: 14px;
    margin: 0 0 2px;
  }
  .father-num{
    font-size: 13px;
    .num{
      display: flex;
      div{
        margin: 5px 20px 5px 0;
      }
    }
    .son-num{
      margin-bottom: 5px;
    }
  }
}
.topic-button{
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
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
      cursor: pointer;
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
        cursor: pointer;
      }
      .title{
        font-weight: bold;
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
.icon-zone{
  position: absolute;
  top: 40px;
  right: 120px;
  .el-icon-edit-outline,
  .el-icon-delete{
    font-size: 20px;
    color: rgba(72,143,206,1);
    margin-right: 8px;
    cursor: pointer;
  }
}
</style>
