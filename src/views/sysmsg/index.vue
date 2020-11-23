<template>
  <div class="sysmsg-container">
    <div class="sysmsg-text">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'Sysmsg',
  data() {
    return {
      name: '发布系统信息'
    }
  }
}
</script>

<style lang="scss" scoped>
.sysmsg {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
