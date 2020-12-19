<template>
  <div class="app-container">
    <!-- 条件查询表单 -->
    <div class="form-container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-select v-model="searchForm.type" placeholder="选择查询类型" style="width:150px;">
            <el-option label="考生姓名" value="realName"></el-option>
            <el-option label="考试等级" value="level"></el-option>
            <el-option label="考试名称" value="examName"></el-option>
            <el-option label="报名状态" value="status"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-if="searchForm.type==='realName'||searchForm.type==='examName'"
            v-model="searchForm.key"
            placeholder="输入查询内容"
            style="width:150px;">
          </el-input>
          <el-select v-if="searchForm.type==='level'"
            v-model="searchForm.key"
            placeholder="选择查询内容"
            style="width:150px;">
            <el-option v-for="item in level_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-if="searchForm.type==='status'"
            v-model="searchForm.key"
            placeholder="选择查询内容"
            style="width:150px;">
            <el-option v-for="item in status_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitSearchForm()">查询</el-button>
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
            <el-button type="primary" size="small" @click="clickModifyBtn(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="clickCheckFailBtn(scope.row)">审核不通过</el-button>
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

    <!-- 修改报考信息dialog -->
    <div class="dialog">
      <el-dialog title="修改报考信息" :visible.sync="dialogVisible" width="500px" :before-close="handleCancel">
        <el-form :model="modifyForm" label-position="left" label-width="78px" ref="modifyForm">
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="modifyForm.realName"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-input v-model="modifyForm.gender"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="contact">
            <el-input v-model="modifyForm.contact"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="modifyForm.email"></el-input>
          </el-form-item>
          <el-form-item label="教育背景" prop="eduBack">
            <el-input v-model="modifyForm.eduBack"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址" prop="homeAddress">
            <el-input v-model="modifyForm.homeAddress"></el-input>
          </el-form-item>
        </el-form>
  
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel()">取 消</el-button>
          <el-button type="primary" @click="submitModifyForm()">提 交</el-button>
        </span>
      </el-dialog>
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
      searchForm: {
        type: '',
        key: ''
      },
      // 查询内容（下拉框）
      level_options: [{
        value: 1,
        label: '初级'
      }, {
        value: 2,
        label: '中级'
      }, {
        value: 3,
        label: '高级'
      }],
      status_options: [{
        value: -1,
        label: '报名失败',
      }, {
        value: 0,
        label: '待付款',
      }, {
        value: 1,
        label: '报名成功',
      }, {
        value: 2,
        label: '完成考试',
      }],
      // 报考信息列表 (表格分页)
      tableData: [],
      showData: [],
      pageNo: 1,
      pageSize: 5,
      total: 0,
      // 修改报考信息dialog
      dialogVisible: false,
      modifyForm: {
        enrollId: '',
        realName: '',
        gender: '',
        contact: '',
        email: '',
        eduBack: '',
        homeAddress: ''
      }
    }
  },

  methods: {
    /**
     * @method 提交条件查询表单
     */
    submitSearchForm() {
      const pageSize = this.pageSize
      const { type, key } = this.searchForm
      if (type === '' || key === '') {
        this.$alert('表单信息未填写完整','提示')
        return false
      }
      const params = { pageSize, type, key }
      console.log(params)
      api.getEnroll(params).then(res => {
        const { data } = res
        this.total = data.total
        this.tableData = data.tableData
        this.showData = this.tableData[0]
        this.$message.success('查询成功')
      })
    },

    /**
     * @method 点击修改按钮
     */
    clickModifyBtn(row) {
      this.modifyForm.enrollId = row.enrollId
      this.modifyForm.realName = row.realName
      this.modifyForm.gender = row.gender
      this.modifyForm.contact = row.contact
      this.modifyForm.email = row.email
      this.modifyForm.eduBack = row.eduBack
      this.modifyForm.homeAddress = row.homeAddress
      this.dialogVisible = true
    },

    /**
     * @method 取消修改
     */
    handleCancel() {
      this.dialogVisible = false
      this.$refs['modifyForm'].resetFields()
    },

    /**
     * @method 确认修改
     */
    submitModifyForm() {
      this.$confirm('确认继续此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = this.modifyForm
        console.log(data)
        api.updateEnroll(data).then(res => {
          const { data } = res

          const pageSize = this.pageSize
          const { type, key } = this.searchForm
          const params = { pageSize, type, key }
          console.log(params)
          api.getEnroll(params).then(res => {
            const { data } = res
            this.total = data.total
            this.tableData = data.tableData
            this.showData = this.tableData[0]
            this.dialogVisible = false
          })

          this.$message.success('操作成功')
        })
      }).catch(() => {
        this.$message.info('取消操作')
      })
    },

    /**
     * @method 审核不通过做的操作
     */
    clickCheckFailBtn(row) {
      this.$confirm('确认继续此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const enrollId = row.enrollId
        const data = { enrollId }
        console.log(data)
        api.updateStatus(data).then(res => {
          const { data } = res
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
