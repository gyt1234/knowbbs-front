<template>
  <el-container>
    <el-header>
      <div class="title-zone">知也论坛</div>
      <div class="menu-zone">
        <div class="menu-item" @click="toMain">首页</div>
        <div class="menu-item">主题</div>
      </div>
      <div class="search-zone">
        <el-input placeholder="搜索其实很简单" v-model="query"></el-input>
        <i class="el-icon-search"></i>
      </div>
      <div class="login-zone">
        <span>登录</span>
        <span style="margin-left: 10px">注册</span>
      </div>
    </el-header>
    <el-main>
      这是内容
      <router-view></router-view>
    </el-main>
    <el-footer>
      <div class="divider"></div>
      <div>知也论坛</div>
      <div>Powered by geyating ©2021 www.knowbbs.com</div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 搜索关键词
      query: ''
    }
  },
  methods: {
    // 跳转首页
    toMain() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.el-header{
  background-color: rgba(72,143,206,1);
  height: 44px !important;
  display: flex;
  margin-bottom: 10px;

  .title-zone{
    width: 19.6%;
    text-align: right;
    line-height: 44px;
    background-color: rgba(72,143,206,1);
    margin-right: 20px;
    color: #ffffff;
  }
  .menu-zone{
    height: 44px !important;
    width: 11%;
    background-color: rgba(72,143,206,1);
    display: flex;
    line-height: 44px;
    color: #ffffff;

    .menu-item{
      width: 60px;
      text-align: center;
      margin-right: 5px;
      background-color: rgba(59,127,196,1);
      font-size: 14px;
      cursor: pointer;
    }
  }
  .search-zone{
    width: 20%;
    background-color: rgba(72,143,206,1);
    margin-right: 20px;
    display: flex;

    .el-icon-search{
      width: 20px;
      background: #ffffff;
      height: 28px;
      line-height: 28px;
      margin-top: 7px;
      border: 1px solid transparent;
      border-radius: 0 4px 4px 0;
    }
  }
  .login-zone{
    background-color: rgba(72,143,206,1);
    width: 31.2%;
    text-align: right;
    line-height: 44px;
    color: #ffffff;
    font-size: 14px;
  }
}
.el-footer{
  margin-top: 10px;
  text-align: center;
  color: #cccccc;
  font-size: 12px;

  .divider{
    height: 1px;
    background-color: #cccccc;
    margin-bottom: 10px;
  }
}
.el-main{
  width: 70%;
  margin: 0 auto;
  background-color: aqua;
}
::v-deep{
  .el-input__inner{
    height: 30px;
    margin-top: 7px;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
  .el-input__suffix{
    height: 30px;
    margin: 3px;
  }
}
</style>
