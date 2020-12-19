<template>
  <div class="app-container">
    <!-- 标签 -->
    <div class="title-container">
      <el-card shadow="never">
        <i class="el-icon-tickets"></i> 修改申请审核
      </el-card>
    </div>

    <!-- 报考信息列表 -->
    <div class="table-container">
      <el-table :data="showData" style="width: 100%;">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="申请信息描述">
                <span>{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="candidateId" label="考生id" width="150px"></el-table-column>
        <el-table-column prop="realName" label="考生姓名" width="150px"></el-table-column>
        <el-table-column prop="description" label="申请信息描述"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="clickAcceptBtn(scope.row)">通过</el-button>
            <el-button type="danger" size="small" @click="clickRefuseBtn(scope.row)">不通过</el-button>
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

    <!-- 审核不通过反馈信息dialog -->
    <div class="dialog">
      <el-dialog title="修改报考信息" :visible.sync="dialogVisible" width="500px" :before-close="handleCancel">
        <el-form :model="form" label-position="left" label-width="78px" ref="modifyForm">
          <el-form-item label="反馈信息" prop="feedback">
            <el-input type="textarea" v-model="form.feedback"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel()">取 消</el-button>
          <el-button type="primary" @click="submitForm()">提 交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/edu/apply'

export default {
  inject: ['reload'],
  data() {
    return {
      // 申请列表 (表格分页)
      tableData: [],
      showData: [],
      pageNo: 1,
      pageSize: 5,
      total: 0,
      // dialog
      dialogVisible: false,
      form: {
        applyId: '',
        feedback: ''
      }
      
    }
  },

  created() {
    const pageSize = this.pageSize
    const params = { pageSize }
    api.getApply(params).then(res => {
      const { data } = res
      this.total = data.total
      this.tableData = data.tableData
      this.showData = this.tableData[0]
    })
  },

  methods: {
    /**
     * @method 点击审核通过
     */
    clickAcceptBtn(row) {
      const applyId = row.applyId
      const data = { applyId }
      console.log(data)
      api.acceptApply(data).then(res => {
        const { data } = res
        this.$message.success('操作成功')
        this.reload()
      })
    },

    /**
     * @method 点击审核不通过
     */
    clickRefuseBtn(row) {
      this.dialogVisible = true
      this.form.applyId = row.applyId
    },

    /**
     * @method 取消提交
     */
    handleCancel() {
      this.dialogVisible = false
      this.form.applyId = ''
      this.form.feedback = ''
    },

    /**
     * @method 提交反馈信息
     */
    submitForm() {
      const applyId = this.form.applyId
      const feedback = this.form.feedback
      if (feedback === '') {
        this.$alert('表单信息未填写完整', '提示')
        return false
      }
      const data = { applyId, feedback }
      console.log(data)
      api.refuseApply(data).then(res => {
        const { data } = res
        this.$message.success('操作成功')
        this.reload()
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
