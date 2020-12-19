<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>{{ examName }}</span>
      <el-button class="btn" type="text" @click="clickEditBtn()">修改</el-button>
    </div>
    <div class="text item">
      <span class="item-title">考试日期</span>
      <span>{{ examDate }}</span>
    </div>
    <div class="text item">
      <span class="item-title">考试时间</span>
      <span>{{ examStart + '-' + examEnd }}</span>
    </div>
    <div class="text item">
      <span class="item-title">考试时长</span>
      <span>{{ interval }}分钟</span>
    </div>
    <div class="text">
      <span class="item-title">考试状态</span>
      <span class="green">{{ status }}</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'SessionCard',
  props: [ 'examName', 'examDate', 'examStart', 'examEnd', 'interval', 'status' ],
  methods: {
    clickEditBtn() {
      this.$emit("click")
    }
  }
}
</script>

<style lang="scss" scoped>
.green {
  color: #67C23A;
}

.text {
  font-size: 14px;
  color: #777777;
}

.btn {
  float: right;
  padding: 3px 0;
}

.item {
  margin-bottom: 18px;
}

.item-title {
  padding-right: 20px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>
