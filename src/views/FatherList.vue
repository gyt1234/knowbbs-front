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
        <el-button type="primary">发帖</el-button>
        <div>分页按钮</div>
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
</style>
