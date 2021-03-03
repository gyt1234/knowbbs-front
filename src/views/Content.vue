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
        <el-button type="primary">回复</el-button>
      </div>
      <div class="center-zone">
        <div class="left-zone">
          <img src="../assets/user_default.jpg"/>
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
      <div class="center-zone">
        <div class="left-zone">
          <img src="../assets/user_default.jpg"/>
          <div class="username">张三</div>
        </div>
        <div class="right-zone">
          <div class="time">
            <div>评论时间：2021-01-11 11:12:23</div>
            <div class="comment">
              <span>1楼</span>
              <span class="divider">|</span>
              <span style="cursor: pointer">引用</span>
              <span class="divider">|</span>
              <span style="cursor: pointer">删除</span>
            </div>
          </div>
          <div class="article">
            这是文章内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊1少时
            诵诗书所所所所所所所所所所所少时诵诗书所所所所所所所所所所啊啊
            啊啊啊啊啊啊啊啊啊啊啊啊啊飒飒飒飒是所所所所所所所所所所少时诵诗
            书所所所所所所所所所所所所所
          </div>
        </div>
      </div>
      <div class="top-zone">
        <el-button type="primary">回复</el-button>
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
      contentInfo: {}
    }
  },
  async created() {
    this.contentId = this.$route.params.id
    this.getContentInfo()
  },
  methods: {
    // 获取帖子信息
    async getContentInfo() {
      const { data: res } = await this.$http.get('front/content.php', { params: { contentId: this.contentId } })
      this.contentInfo = res
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
</style>
