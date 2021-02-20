<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>父板块名称</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区-->
    <el-card class="box-card">
      <div class="father-box">
        <h3>父板块名称</h3>
        <div class="father-num">
          <div class="num">
            <div>今日：<strong>0</strong></div>
            <div>总贴：<strong>0</strong></div>
          </div>
          <div class="son-num">
            <span>子板块：</span>
            <span>子版块1&nbsp;&nbsp;</span>
            <span>子版块2</span>
          </div>
        </div>
        <div class="topic-button">
          <el-button type="primary">发帖</el-button>
          <div>分页按钮</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'FatherList'
}
</script>

<style lang="less" scoped>
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
  .topic-button{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
