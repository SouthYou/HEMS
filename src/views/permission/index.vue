<template>
  <div class="permission-container">
    <div class="permission-text">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'Permission',
  data() {
    return {
      name: '角色权限管理'
    }
  }
}
</script>

<style lang="scss" scoped>
.permission {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
