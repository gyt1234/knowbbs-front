<template>
  <div class="son-item" >
    <div class="img-zone">
      <a @click="goUser(content.uid)"><img :src=getPhoto /></a>
    </div>
    <div class="content-zone">
      <div class="content-title">
        <span v-show="content.module_name" @click="goSonList(content.sonId)">[{{content.module_name}}]</span>
        <span class="title" @click="goContent(content.id)">{{content.title}}</span>
      </div>
      <div class="content-info">
        <span>楼主：{{content.username}}</span>
        <span>{{content.create_time}}</span>
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
</template>

<script>
import user from '@/assets/user_default.jpg'
import photo1 from '@/assets/photo1.jpg'
import photo2 from '@/assets/photo2.jpg'
import photo3 from '@/assets/photo3.jpg'
import photo4 from '@/assets/photo4.jpg'
export default {
  name: 'ContentItem',
  props: {
    content: Object
  },
  data() {
    return {
      username: '',
      photo: ''
    }
  },
  created() {
    this.username = window.sessionStorage.getItem('uname')
    this.changgeImg()
  },
  computed: {
    getPhoto() {
      if (this.content.photo === null) {
        return user
      } else {
        if (this.content.photo.includes('photo1')) {
          return photo1
        } else if (this.content.photo.includes('photo3')) {
          return photo3
        } else if (this.content.photo.includes('photo2')) {
          return photo2
        } else if (this.content.photo.includes('photo4')) {
          return photo4
        } else {
          return user
        }
      }
    }
  },
  methods: {
    // 改变照片
    changgeImg() {
      if (this.content.photo === null) {
        this.photo = user
      } else {
        if (this.content.photo.includes('photo1')) {
          this.photo = photo1
        } else if (this.content.photo.includes('photo3')) {
          this.photo = photo3
        } else if (this.content.photo.includes('photo2')) {
          this.photo = photo2
        } else if (this.content.photo.includes('photo4')) {
          this.photo = photo4
        } else {
          this.photo = user
        }
      }
    },
    // 点击跳转到个人中心
    goUser(id) {
      if (this.username) {
        this.$router.push({ name: 'User', params: { id: id } })
      } else {
        this.$router.push('/login')
      }
    },
    // 跳转到帖子编辑页面
    goUpdateContent(id) {
      this.$router.push({ name: 'UpdateContent', params: { id: id } })
    },
    // 根据帖子id删除帖子
    deleteContentById(id) {
      this.$emit('delete', id)
    },
    // 点击子版块名称进入子版块列表
    goSonList(id) {
      this.$router.push({ name: 'SonList', params: { id: id } })
    },
    // 跳转到帖子详情页面
    goContent(id) {
      this.$router.push({ name: 'Content', params: { id: id } })
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
