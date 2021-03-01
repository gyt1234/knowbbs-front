<template>
  <div>帖子：{{allNum}}</div>
</template>

<script>
export default {
  name: 'AllNum',
  props: {
    sonId: String
  },
  data() {
    return {
      allNum: 0
    }
  },
  created() {
    this.getAllNum()
  },
  methods: {
    // 获取该子版块下的所有的帖子数
    async getAllNum() {
      const { data: res } = await this.$http.get('front/allNum.php', { params: { sonId: this.sonId } })
      this.allNum = res.count_all
    }
  }
}
</script>
