<template>
  <div class="score-container">
    <div class="score-text">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'Score',
  data() {
    return {
      name: '考生成绩管理'
    }
  }
}
</script>

<style lang="scss" scoped>
.score {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
