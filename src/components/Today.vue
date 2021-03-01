<template>
  <span>（今日{{todayNum}}）</span>
</template>

<script>
export default {
  name: 'Today',
  props: {
    sonId: String
  },
  data() {
    return {
      todayNum: 0
    }
  },
  created() {
    this.getTodayNum()
  },
  methods: {
    // 根据子板块Id查找今日发帖数
    async getTodayNum() {
      const { data: res } = await this.$http.get('front/todayNum.php', { params: { sonId: this.sonId } })
      this.todayNum = res.count_today
    }
  }
}
</script>

<style lang="less" scoped></style>
