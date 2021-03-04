<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{sonInfo && sonInfo.father_name}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{sonInfo && sonInfo.module_name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card-zone">
      <!--卡片视图区-->
      <el-card shadow="always" class="box-card">
        <div class="father-box">
          <h3>{{sonInfo && sonInfo.module_name}}</h3>
          <div class="father-num">
            <div class="num">
              <div>今日：<strong>{{todayNum}}</strong></div>
              <div>总贴：<strong>{{allNum}}</strong></div>
            </div>
            <div class="son-num">
              <span>版主：</span>
              <span>葛雅婷</span>
            </div>
            <div class="son-num">
              <span>{{sonInfo && sonInfo.info}}</span>
            </div>
          </div>
          <div class="topic-button">
            <el-button type="primary" @click="goPublish(sonId)">发帖</el-button>
            <div>分页按钮</div>
          </div>
        </div>
        <div class="son-box">
          <div class="son-item" v-for="(content,index) in contentList" :key="index">
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
                <span>最后回复：2021-12-23 23:12:23</span>
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
                <i class="el-icon-delete"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="topic-button">
          <el-button type="primary">发帖</el-button>
          <div>分页按钮</div>
        </div>
      </el-card>
      <!--右侧板块列表区域-->
      <board-list></board-list>
    </div>
  </div>
</template>

<script>
import BoardList from '@/components/BoardList'
export default {
  name: 'SonList',
  components: {
    BoardList
  },
  data() {
    return {
      // 子版块id
      sonId: '',
      // 子版块信息
      sonInfo: {},
      // 子版块下面帖子列表
      contentList: [],
      // 子版块下面帖子总数
      allNum: 0,
      // 子版块下面今日发帖数
      todayNum: 0,
      // 当前登录用户名
      username: ''
    }
  },
  created() {
    this.sonId = this.$route.params.id
    this.username = window.sessionStorage.getItem('uname')
    this.getSonInfo()
    this.getTodayNum()
    this.getAllNum()
    this.getContents()
  },
  methods: {
    // 根据子版块ID获取版块信息
    async getSonInfo() {
      const { data: res } = await this.$http.get('front/son.php', { params: { sonId: this.sonId } })
      this.sonInfo = res
    },
    // 获取该子版块下的所有的帖子数
    async getAllNum() {
      const { data: res } = await this.$http.get('front/allNum.php', { params: { sonId: this.sonId } })
      this.allNum = res.count_all
    },
    // 根据子板块Id查找今日发帖数
    async getTodayNum() {
      const { data: res } = await this.$http.get('front/todayNum.php', { params: { sonId: this.sonId } })
      this.todayNum = res.count_today
    },
    // 获取该子版块下面的所有帖子
    async getContents() {
      const { data: res } = await this.$http.get('front/content_by_son.php', { params: { sonId: this.sonId } })
      this.contentList = res
    },
    // 跳转到帖子详情页
    goContent(id) {
      this.$router.push({ name: 'Content', params: { id: id } })
    },
    // 跳转到发帖页面
    goPublish(id) {
      this.$router.push({ name: 'PublishSon', params: { sonId: id } })
    },
    // 点击跳转到个人中心
    goUser(id) {
      this.$router.push({ name: 'User', params: { id: id } })
    },
    // 跳转到帖子编辑页面
    goUpdateContent(id) {
      this.$router.push({ name: 'UpdateContent', params: { id: id } })
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
  top: 15px;
  right: 120px;
  .el-icon-edit-outline,
  .el-icon-delete{
    cursor: pointer;
    font-size: 20px;
    color: rgba(72,143,206,1);
    margin-right: 8px;
  }
}
</style>
