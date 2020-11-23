<template>
  <div class="examTime-container">
    <div class="examTime-text">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'examTime',
  data() {
    return {
      name: '场次管理'
    }
  }
}
</script>

<style lang="scss" scoped>
.examTime {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
