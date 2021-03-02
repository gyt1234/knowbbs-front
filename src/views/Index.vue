<template>
  <div>
    <div class="section">
      <div class="title">热门动态</div>
      <div class="content">
        <div class="item" v-for="(content, index) in hotConttent" :key="index">
          <span class="item-title">[{{content.module_name}}]</span>
          <span class="item-content">{{content.title}}</span>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="title">最新文章</div>
      <div class="content">
        <div class="item" v-for="(content,index) in newContentList" :key="index">
          <span class="item-title">[{{content.module_name}}]</span>
          <span class="item-content">{{content.title}}</span>
        </div>
      </div>
    </div>
    <div class="section recommend-board">
      <div class="title">推荐板块</div>
      <div class="content">
        <el-tag type="info" v-for="(recommend,index) in recommendBoards" :key="index" @click="goSonList(recommend.id)">{{recommend.module_name}}</el-tag>
      </div>
    </div>
    <div class="board" v-for="(father,index) in allBoards" :key="index">
      <div class="board-title" @click="goFatherList(father.id)">{{father.father_name}}</div>
      <div class="board-content">
        <div class="son" v-for="(son,index) in father.sonArr" :key="index">
          <div style='cursor: pointer;' @click="goSonList(son[1])">{{son[0]}}<today :sonId="son[1]"/></div>
          <div style="font-weight: normal"><all-num :sonId="son[1]"/></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Today from '@/components/Today'
import AllNum from '@/components/AllNum'
export default {
  name: 'Index',
  components: {
    Today,
    AllNum
  },
  data() {
    return {
      // 所有的子板块
      boardList: [],
      // 父板块以及其下的子板块分类列表
      allBoards: [],
      // 推荐板块
      recommendBoards: [],
      // 最新文章列表
      newContentList: [],
      // 热门动态列表
      hotConttent: []
    }
  },
  async created () {
    const { data: res } = await this.$http.get('admin/son.php')
    this.boardList = res
    this.handleBoards()
    this.getRecommendBoards()
    this.getNewContent()
    this.getHotContent()
  },
  methods: {
    // 将所有的板块分类
    handleBoards() {
      const tempArr = []
      const newArr = []
      for (let i = 0; i < this.boardList.length; i++) {
        if (tempArr.indexOf(this.boardList[i].father_module_name) === -1) {
          newArr.push({
            id: this.boardList[i].father_id,
            father_name: this.boardList[i].father_module_name,
            sonArr: [[this.boardList[i].module_name, this.boardList[i].id]]
          })
          tempArr.push(this.boardList[i].father_module_name)
        } else {
          for (let j = 0; j < newArr.length; j++) {
            if (newArr[j].father_name === this.boardList[i].father_module_name) {
              newArr[j].sonArr.push([this.boardList[i].module_name, this.boardList[i].id])
              break
            }
          }
        }
      }
      this.allBoards = newArr
    },
    // 获取推荐板块
    async getRecommendBoards() {
      const { data: res } = await this.$http.get('front/recommend_son.php')
      this.recommendBoards = res
    },
    // 获取最新文章
    async getNewContent() {
      const { data: res } = await this.$http.get('front/new_content.php')
      this.newContentList = res
    },
    // 获取热门动态
    async getHotContent() {
      const { data: res } = await this.$http.get('front/hot_content.php')
      this.hotConttent = res
    },
    // 点击父板块名称进入父板块列表
    goFatherList(id) {
      this.$router.push({ name: 'FatherList', params: { id: id } })
    },
    // 点击子版块名称进入子版块列表
    goSonList(id) {
      this.$router.push({ name: 'SonList', params: { id: id } })
    }
  }
}
</script>

<style lang="less" scoped>
.section{
  background-color: #ffffff;
  margin-bottom: 10px;
  font-size: 14px;

  .title{
    color: #ff0000;
    height: 34px;
    font-weight: bold;
    border-bottom: 1px solid #e4e4e4;
    line-height: 40px;
    text-indent: 10px;
  }

  .content{
    padding: 0 10px 10px;
    color: #333333;
    display: flex;
    flex-wrap: wrap;

    .item{
      width: 463px;
      height: 25px;
      line-height: 25px;
      border-bottom: 1px dashed #e4e4e4;
      padding: 2px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      font-size: 12px;

      .item-title{
        display: inline-block;
        cursor: pointer;
        margin-right: 5px;
      }
      .item-content{
        display: inline-block;
        width: 300px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
      }
    }
  }
}
.recommend-board{
  margin-bottom: 0;
}
.el-tag{
  margin-right: 16px;
  margin-top: 10px;
  cursor: pointer;
}
.board-title{
  color: #105cb6;
  background: #f7f7f7;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  padding: 7px 10px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}
.board-content{
  background-color: #ffffff;
  padding: 10px 15px 0;
  display: flex;
  flex-wrap: wrap;

  .son{
    background: url(../assets/new.gif) 0 center no-repeat;
    width: 255px;
    padding: 15px 0 20px 45px;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px dashed #e4e4e4 ;

    span{
      color: red;
      font-weight: normal;
    }
  }
}
</style>
