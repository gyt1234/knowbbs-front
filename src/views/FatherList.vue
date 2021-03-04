<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{fatherName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card-zone">
      <!--卡片视图区-->
      <el-card shadow="always" class="box-card">
        <div class="father-box">
          <h3>{{fatherName}}</h3>
          <div class="father-num">
            <div class="num">
              <div>今日：<strong>{{fatherTodayNum}}</strong></div>
              <div>总贴：<strong>{{fatherAllNum}}</strong></div>
            </div>
            <div class="son-num">
              <span>子板块：</span>
              <span style="cursor:pointer;" v-for="(son,index) in sonList" :key="index" @click="goSonList(son.id)">{{son.module_name}}&nbsp;&nbsp;</span>
            </div>
          </div>
          <div class="topic-button">
            <el-button type="primary" @click="goPublish(fatherId)">发帖</el-button>
            <div>分页按钮</div>
          </div>
        </div>
        <div class="son-box">
          <div class="son-item" v-for="(content,index) in allContent" :key="index">
            <div class="img-zone">
              <a @click="goUser(content.uid)"><img src="../assets/user_default.jpg"/></a>
            </div>
            <div class="content-zone">
              <div class="content-title">
                <span @click="goSonList(content.sonId)">[{{content.module_name}}]</span>
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
                <i class="el-icon-delete" @click="deleteContentById(content.id)"></i>
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
import BoardList from '../components/BoardList.vue'
export default {
  name: 'FatherList',
  components: {
    BoardList
  },
  data() {
    return {
      // 父板块id
      fatherId: '',
      // 父板块名称
      fatherName: '',
      // 父板块下面子版块列表
      sonList: [],
      // 父板块下面的所有帖子数
      fatherAllNum: 0,
      // 父板块下所有今日发布的帖子
      fatherTodayNum: 0,
      // 父板块下面的所有帖子
      allContent: [],
      // 当前登录用户名
      username: ''
    }
  },
  async created() {
    this.fatherId = this.$route.params.id
    this.username = window.sessionStorage.getItem('uname')
    const { data: res } = await this.$http.get('front/father.php', { params: { fatherId: this.fatherId } })
    this.fatherName = res[0].father_module_name
    this.sonList = res
    this.getAllNum()
    this.getTodayNum()
    this.getAllContent()
  },
  methods: {
    // 获取子板块下面所有的帖子
    async getAllNum() {
      for (const son of this.sonList) {
        const { data: res } = await this.$http.get('front/allNum.php', { params: { sonId: son.id } })
        this.fatherAllNum += Number(res.count_all)
      }
    },
    // 获取子板块下面今日发布的帖子
    async getTodayNum() {
      for (const son of this.sonList) {
        const { data: res } = await this.$http.get('front/todayNum.php', { params: { sonId: son.id } })
        this.fatherTodayNum += Number(res.count_today)
      }
    },
    // 获取该父板块下面的所有帖子
    async getAllContent() {
      const { data: res } = await this.$http.get('front/content_by_father.php', { params: { fatherId: this.fatherId } })
      this.allContent = res
    },
    // 点击子版块名称进入子版块列表
    goSonList(id) {
      this.$router.push({ name: 'SonList', params: { id: id } })
    },
    // 跳转到发帖页面
    goPublish(id) {
      this.$router.push({ name: 'PublishFather', params: { fatherId: id } })
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
    font-size: 20px;
    color: rgba(72,143,206,1);
    margin-right: 8px;
    cursor: pointer;
  }
}
</style>
