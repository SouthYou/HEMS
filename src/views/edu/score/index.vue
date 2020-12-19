<template>
  <div class="app-container">
    <el-upload class="inline-block"
      action="#"
      :show-file-list="false"
      accept=".xls,.xlsx"
      :before-upload="beforeFileUpload"
      :http-request="handleFileUpload">
      <el-button type="success" icon="el-icon-upload">成绩导入</el-button>
    </el-upload>

    <el-divider>导入数据一览</el-divider>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="candidateNo" label="准考证号"></el-table-column>
      <el-table-column prop="realName" label="考生姓名"></el-table-column>
      <el-table-column prop="examNo" label="考试编号"></el-table-column>
      <el-table-column prop="examName" label="考试名称"></el-table-column>
      <el-table-column prop="score" label="考试成绩"></el-table-column>
      <el-table-column prop="pass" label="是否合格"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as api from '@/api/edu/score'

export default {
  data() {
    return {
      tableData: [],
    }
  },

  methods: {
    /**
     * @method 上传文件前的处理
     * @description 判断文件格式是否合法
     * @param file 待上传的文件对象
     */
    beforeFileUpload(file) {
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!isExcel) {
        this.$message.error('上传文件只能是 xls、xlsx格式!')
      }
      return isExcel
    },

    /**
     * @method 上传文件
     * @param item 待上传的文件对象
     */
    handleFileUpload(item) {
      const file = item.file
      let formData = new FormData()
      formData.append("file", file)
      api.uploadExcel(formData).then(res => {
        const { data } = res
        this.tableData = data
        this.$message.success('导入成功')
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
