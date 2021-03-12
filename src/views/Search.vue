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
        </div>
        <div class="son-box">
          <div v-for="(content,index) in allContents" :key="index">
            <content-item :content=content @delete="deleteContentById($event,index)" />
          </div>
        </div>
        <div class="topic-button">
          <!-- 分页功能 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[2, 4, 10, 20]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryNum"
            background
          >
          </el-pagination>
        </div>
      </el-card>
      <!--右侧板块列表区域-->
      <board-list></board-list>
    </div>
  </div>
</template>

<script>
import BoardList from '../components/BoardList.vue'
import ContentItem from '@/components/ContentItem'
export default {
  name: 'Search',
  components: {
    BoardList,
    ContentItem
  },
  data() {
    return {
      // 获取帖子列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1, // 当前的页数
        pagesize: 2 // 当前每页显示多少条数据
      },
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
    this.queryInfo.query = this.$route.params.keywords
    this.username = window.sessionStorage.getItem('uname')
    this.getQueryNum()
    this.getAllContents()
  },
  methods: {
    // 获取含有关键词的帖子数
    async getQueryNum() {
      const { data: res } = await this.$http.get('front/search_num.php', { params: { keywords: this.query } })
      this.queryNum = Number(res.count_all)
    },
    // 搜索所有含有关键词的帖子
    async getAllContents() {
      const { data: res } = await this.$http.get('front/search.php', { params: this.queryInfo })
      this.allContents = res
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getAllContents()
    },
    // 监听 页码 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getAllContents()
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
