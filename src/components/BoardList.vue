<template>
  <div class="container">
    <div class="header-zone">
      <div class="title-zone">板块列表</div>
    </div>
    <div class="body-zone">
      <div class="board-list" v-for="(father,index) in allBoards" :key="index">
        <div class="father-title">{{father.father_name}}</div>
        <div class="son-list" v-for="(son,index) in father.sonArr" :key="index">
          <div class="son-title">{{son}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardList',
  data() {
    return {
      boardList: [],
      allBoards: []
    }
  },
  async created () {
    // this.getBoards()
    const { data: res } = await this.$http.get('admin/son.php')
    this.boardList = res
    this.handleBoards()
    console.log(this.allBoards)
  },
  methods: {
    // 获取所有的板块
    async getBoards() {
      const { data: res } = await this.$http.get('admin/son.php')
      this.boardList = res
    },
    // 将所有的板块分类
    handleBoards() {
      const tempArr = []
      const newArr = []
      for (let i = 0; i < this.boardList.length; i++) {
        if (tempArr.indexOf(this.boardList[i].father_module_name) === -1) {
          newArr.push({
            father_name: this.boardList[i].father_module_name,
            sonArr: [this.boardList[i].module_name]
          })
          tempArr.push(this.boardList[i].father_module_name)
        } else {
          for (let j = 0; j < newArr.length; j++) {
            if (newArr[j].father_name === this.boardList[i].father_module_name) {
              newArr[j].sonArr.push(this.boardList[i].module_name)
              break
            }
          }
        }
      }
      this.allBoards = newArr
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  padding: 10px;
  font-size: 13px;
  color: #333333;
  .header-zone{
    width: 280px;
    margin: 0 auto;
    padding: 0 0 7px;
    font-weight: bold;
    color: #666;
    text-indent: 10px;
    border-bottom: 1px solid #e8e8e8;
    font-size: 13px;
  }
  .body-zone{
    margin: 15px 10px 0 20px;
    .son-list{
      margin: 5px 10px 10px 0;
      .son-title{
        color: #666666;
        padding-left: 10px;
        line-height: 180%;
        background: url(../assets/index_icon.png) 0px -389px no-repeat;
      }
    }
  }
}
</style>
