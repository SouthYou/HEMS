<template>
  <div class="app-container">
    <!-- 标签 -->
    <div class="title-container">
      <el-card shadow="never">
        <i class="el-icon-tickets"></i> 考试状态管理
      </el-card>
    </div>

    <!-- 考试状态列表 -->
    <div class="table-container">
      <el-table :data="showData" border style="width: 100%">
        <el-table-column prop="level" label="考试等级"></el-table-column>
        <el-table-column prop="examName" label="考试名称"></el-table-column>
        <el-table-column prop="enrollStart" label="报考开始时间"></el-table-column>
        <el-table-column prop="enrollEnd" label="报考结束时间"></el-table-column>
        <el-table-column prop="examStart" label="考试开始时间"></el-table-column>
        <el-table-column prop="examEnd" label="考试结束时间"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作" width="210px">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="showDialog(scope.row)">修改</el-button>
            <el-button type="success" icon="el-icon-refresh" size="small"
              v-if="scope.row.status==='分配中'"
              @click="generateArrange(scope.row.examNo)">生成考试安排
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 数据分页 -->
    <div class="pagination">
      <el-pagination background layout="prev, pager, next"
        :current-page="pageNo"
        :page-size="pageSize"
        :total="total"
        @current-change="pageNoChange">
      </el-pagination>
    </div>

    <el-dialog
      title="编辑考试状态"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose">
      <el-radio-group v-model="status">
        <el-row>
          <el-radio border :label="0">未开始报名</el-radio>
          <el-radio border :label="1">报名中</el-radio>
          <el-radio border :label="2">分配中</el-radio>
        </el-row>
        <el-row style="margin-top:10px;">
          <el-radio border :label="3">待开考</el-radio>
          <el-radio border :label="4">已开考</el-radio>
          <el-radio border :label="5">阅卷中</el-radio>
        </el-row>
      </el-radio-group>
      <span slot="footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/edu/status'
import { generateArrange } from '@/api/edu/arrange'

export default {
  inject: ['reload'],
  data() {
    return {
      // 状态map
      statusMap: {
        '未开始报名': 0,
        '报名中': 1,
        '分配中': 2,
        '待开考': 3,
        '已开考': 4,
        '阅卷中': 5
      },
      // 编辑状态dialog
      dialogVisible: false,
      examNo: '',
      status: undefined,
      // 考试状态列表 (表格分页)
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
    api.getStatus(params).then(res => {
      const { data } = res
      this.total = data.total
      this.tableData = data.tableData
      this.showData = this.tableData[0]
    })
  },

  methods: {
    /**
     * @method 展示dialog时获取examNo
     */
    showDialog(row) {
      this.dialogVisible = true
      this.examNo = row.examNo
      this.status = this.statusMap[row.status]
    },

    /**
     * @method 关闭dialog时重置examNo
     */
    handleClose() {
      this.dialogVisible = false
      this.examNo = ''
    },

    /**
     * @method 生成考试安排
     */
    generateArrange(examNo) {
      const loading = this.$loading({
        lock: true,
        text: '考试安排生成中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      generateArrange({ examNo }).then(res => {
        this.$message.success('成功生成考试安排')
        this.reload()
      }).finally(_ => {
        loading.close()
      })
    },

    /**
     * @method 提交更改状态的请求
     */
    onSubmit(row) {
      this.dialogVisible = false
      const examNo = this.examNo
      const status = this.status
      const data = { examNo, status }
      console.log(data)
      api.updateStatus(data).then(res => {
        const { data } = res
        this.$message.success('成功更改状态')
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
