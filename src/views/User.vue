<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <div class="card-zone">
      <el-card class="box-card">
        <div class="son-box">
          <div class="son-item">
            <div class="img-zone">
              <a><img src="../assets/user_default.jpg"/></a>
            </div>
            <div class="content-zone">
              <div class="content-title">
                <span>[新手上路]</span>
                <span class="title">论坛今天可以注册啦！</span>
              </div>
              <div class="content-info">
                <span>楼主：葛雅婷</span>
                <span>2021-09-09 12:21:34</span>
                <span>最后回复：2021-12-23 23:12:23</span>
              </div>
            </div>
            <div class="count-zone">
              <div class="count-total">
                <p>浏览</p>
                <p>0</p>
              </div>
              <div class="count-total">
                <p>回复</p>
                <p>0</p>
              </div>
            </div>
          </div>
          <div class="son-item">
            <div class="img-zone">
              <a><img src="../assets/user_default.jpg"/></a>
            </div>
            <div class="content-zone">
              <div class="content-title">
                <span>[新手上路]</span>
                <span class="title">论坛今天可以注册啦！</span>
              </div>
              <div class="content-info">
                <span>楼主：葛雅婷</span>
                <span>2021-09-09 12:21:34</span>
                <span>最后回复：2021-12-23 23:12:23</span>
              </div>
            </div>
            <div class="count-zone">
              <div class="count-total">
                <p>浏览</p>
                <p>0</p>
              </div>
              <div class="count-total">
                <p>回复</p>
                <p>0</p>
              </div>
            </div>
          </div>
          <div class="son-item">
            <div class="img-zone">
              <a><img src="../assets/user_default.jpg"/></a>
            </div>
            <div class="content-zone">
              <div class="content-title">
                <span>[新手上路]</span>
                <span class="title">论坛今天可以注册啦！</span>
              </div>
              <div class="content-info">
                <span>楼主：葛雅婷</span>
                <span>2021-09-09 12:21:34</span>
                <span>最后回复：2021-12-23 23:12:23</span>
              </div>
            </div>
            <div class="count-zone">
              <div class="count-total">
                <p>浏览</p>
                <p>0</p>
              </div>
              <div class="count-total">
                <p>回复</p>
                <p>0</p>
              </div>
            </div>
          </div>
          <div class="son-item">
            <div class="img-zone">
              <a><img src="../assets/user_default.jpg"/></a>
            </div>
            <div class="content-zone">
              <div class="content-title">
                <span>[新手上路]</span>
                <span class="title">论坛今天可以注册啦！</span>
              </div>
              <div class="content-info">
                <span>楼主：葛雅婷</span>
                <span>2021-09-09 12:21:34</span>
                <span>最后回复：2021-12-23 23:12:23</span>
              </div>
            </div>
            <div class="count-zone">
              <div class="count-total">
                <p>浏览</p>
                <p>0</p>
              </div>
              <div class="count-total">
                <p>回复</p>
                <p>0</p>
              </div>
            </div>
          </div>
          <div class="son-item">
            <div class="img-zone">
              <a><img src="../assets/user_default.jpg"/></a>
            </div>
            <div class="content-zone">
              <div class="content-title">
                <span>[新手上路]</span>
                <span class="title">论坛今天可以注册啦！</span>
              </div>
              <div class="content-info">
                <span>楼主：葛雅婷</span>
                <span>2021-09-09 12:21:34</span>
                <span>最后回复：2021-12-23 23:12:23</span>
              </div>
            </div>
            <div class="count-zone">
              <div class="count-total">
                <p>浏览</p>
                <p>0</p>
              </div>
              <div class="count-total">
                <p>回复</p>
                <p>0</p>
              </div>
            </div>
          </div>
          <div class="son-item">
            <div class="img-zone">
              <a><img src="../assets/user_default.jpg"/></a>
            </div>
            <div class="content-zone">
              <div class="content-title">
                <span>[新手上路]</span>
                <span class="title">论坛今天可以注册啦！</span>
              </div>
              <div class="content-info">
                <span>楼主：葛雅婷</span>
                <span>2021-09-09 12:21:34</span>
                <span>最后回复：2021-12-23 23:12:23</span>
              </div>
            </div>
            <div class="count-zone">
              <div class="count-total">
                <p>浏览</p>
                <p>0</p>
              </div>
              <div class="count-total">
                <p>回复</p>
                <p>0</p>
              </div>
            </div>
          </div>
        </div>
        <div class="topic-button">
          <div>分页按钮</div>
        </div>
      </el-card>
      <div class="right-zone">
        <div><img src="../assets/user_default.jpg"/></div>
        <div class="bottom-zone">
          <div class="username">葛雅婷</div>
          <div>帖子总计：18</div>
          <div>
            操作：
            <span class="operation">修改头像</span>
            <span class="divider">|</span>
            <span class="operation">修改密码</span>
          </div>
        </div>
      </div>
    </div>
    <!--修改头像对话框-->
    <!--修改密码对话框-->
  </div>
</template>

<script>
export default {
  name: 'User'
}
</script>

<style lang="less" scoped>
.card-zone{
  display: flex;
  background: rgba(252,252,252,1);
}
.box-card{
  width: 68%;
  padding: 0 0 20px;
}
.el-card, .el-message{
  border-radius: 0;
  border: none;
}
.topic-button{
  margin-top: 10px;
}
.son-item:first-child{
  border-top: 1px dashed #e5e5e5;
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
.right-zone{
  margin: 20px auto 0 auto;
  .bottom-zone{
    margin-top: 5px;
    div{
      font-size: 13px;
      line-height: 150%;
    }
    .username{
      //font-weight: bold;
      font-size: 22px;
      line-height: 140%;
      padding: 5px 0 10px 0;
    }
    .divider{
      padding: 0 5px;
    }
    .operation{
      cursor: pointer;
    }
    .operation:hover{
      color: red;
    }
  }
}
</style>
