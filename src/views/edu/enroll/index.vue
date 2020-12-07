<template>
  <div class="app-container">
    <!-- 条件查询表单 -->
    <div class="form-container">
      <el-form :inline="true" :model="form">
        <el-form-item>
          <el-select v-model="form.type" placeholder="查询类型" style="width:150px;">
            <el-option label="考生姓名" value="realName"></el-option>
            <el-option label="考试等级" value="level"></el-option>
            <el-option label="考试名称" value="examName"></el-option>
            <el-option label="报考状态" value="status"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.key" placeholder="查询内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 报考信息列表 -->
    <div class="table-container">
      <el-table :data="showData" border style="width: 100%">
        <el-table-column prop="candidateId" label="考生id"></el-table-column>
        <el-table-column prop="realName" label="考生姓名"></el-table-column>
        <el-table-column prop="level" label="考试等级"></el-table-column>
        <el-table-column prop="examName" label="考试名称"></el-table-column>
        <el-table-column prop="status" label="报名状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="checkFail(scope.row)">审核不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 数据分页 -->
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next"
        :current-page="pageNo"
        :page-size="pageSize"
        :total="total"
        @current-change="pageNoChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/edu/enroll'

export default {
  inject: ['reload'],
  data() {
    return {
      // 查询条件
      form: {
        type: '',
        key: ''
      },
      // 报考信息列表 (表格分页)
      tableData: [],
      showData: [],
      pageNo: 1,
      pageSize: 5,
      total: 0
    }
  },

  created() {
    const pageSize = this.pageSize
    const params = { pageSize }
    api.getEnroll(params).then(res => {
      const { data } = res
      this.total = data.total
      this.tableData = data.tableData
      this.showData = this.tableData[0]
    })
  },

  methods: {
    /**
     * @method 条件查询
     */
    onSubmit() {
      const pageSize = this.pageSize
      const { type, key } = this.form
      const params = { pageSize, type, key }
      console.log(params)
      api.getEnroll(params).then(res => {
        const { code, data } = res
        if (code !== 20000) {
          console.error('error')
          return false
        }
        this.total = data.total
        this.tableData = data.tableData
        this.showData = this.tableData[0]
        this.$message.success('查询成功')
      })
    },

    /**
     * @method 审核不通过做的操作
     */
    checkFail(row) {
      const enrollId = row.enrollId
      const data = { enrollId }
      this.$confirm('确认继续此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.updateStatus(data).then(res => {
          const { code, data } = res
          if (code !== 20000) {
            this.$message.error('操作失败')
            console.error('error')
            return false
          }
          this.reload()
          this.$message.success('操作成功')
        })
      }).catch(() => {
        this.$message.info('取消操作')
      })
    },

    /**
     * @method 页码改变
     */
    pageNoChange(pageNo) {
      this.pageNo = pageNo
      this.showData = this.tableData[pageNo - 1]
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 20px;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
