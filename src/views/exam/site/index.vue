<template>
  <div class="examSite-container">
    <div class="examSite-text">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'examSite',
  data() {
    return {
      name: '考点管理'
    }
  }
}
</script>

<style lang="scss" scoped>
.examSite {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
