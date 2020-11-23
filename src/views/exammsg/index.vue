<template>
  <div class="exammsg-container">
    <div class="exammsg-text">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'exammsg',
  data() {
    return {
      name: '发布考试信息'
    }
  }
}
</script>

<style lang="scss" scoped>
.exammsg {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
