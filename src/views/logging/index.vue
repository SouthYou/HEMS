<template>
  <div class="logging-container">
    <div class="logging-text">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'Logging',
  data() {
    return {
      name: '日志管理'
    }
  }
}
</script>

<style lang="scss" scoped>
.logging {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
