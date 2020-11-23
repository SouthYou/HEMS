<template>
  <div class="enroll-container">
    <div class="enroll-text">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'enroll',
  data() {
    return {
      name: '报名管理'
    }
  }
}
</script>

<style lang="scss" scoped>
.enroll {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
