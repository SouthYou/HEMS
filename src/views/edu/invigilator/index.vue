<template>
  <div class="app-container">
    <!-- 搜索部分 -->
    <el-button type="success" icon="el-icon-plus" @click="clickAddBtn()">添加监考教师</el-button>
    <el-upload class="inline-block"
      action="#"
      :show-file-list="false"
      accept=".xls,.xlsx"
      :before-upload="beforeFileUpload"
      :http-request="handleFileUpload">
      <el-button type="success" icon="el-icon-upload">批量导入监考教师</el-button>
    </el-upload>
    <div class="form-container">
      <el-input v-model="realName" placeholder="输入教师姓名" style="width:50%"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="submitSearchForm()">查询</el-button>
    </div>

    <el-divider></el-divider>

    <!-- 结果部分 -->
    <div class="table-container">
      <el-table :data="showData" border style="width: 100%">
        <el-table-column prop="realName" label="监考教师姓名"></el-table-column>
        <el-table-column prop="contact" label="联系方式"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" size="small" @click="clickEditBtn(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="clickDelBtn(scope.row.invigilatorId)">删除</el-button>
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

    <!-- 添加 / 编辑考点dialog -->
    <el-dialog :title="invigilatorFormTitle" :visible.sync="invigilatorFormVisible" width="390px" :before-close="handleCancel">
      <el-form :model="invigilatorForm" label-width="70px" ref="invigilatorForm">
        <el-form-item label="教师姓名">
          <el-input :disabled="disabled" v-model="invigilatorForm.realName" placeholder="输入教师姓名"></el-input>
        </el-form-item>

        <el-form-item label="联系方式">
          <el-input v-model="invigilatorForm.contact" placeholder="输入联系方式"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="submitInvigilatorForm()">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/edu/invigilator'

export default {
  inject: ['reload'],
  data() {
    return {
      /* 查询表单 */
      realName: '',
      /* 添加/编辑监考教师表单 */
      invigilatorFormTitle: '',
      invigilatorFormVisible: false,
      disabled: false,
      invigilatorForm: {
        invigilatorId: '',
        realName: '',
        contact: ''
      },
      /* 表格数据 */
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
    api.getInvigilator(params).then(res => {
      const { data } = res
      this.total = data.total
      this.tableData = data.tableData
      this.showData = this.tableData[0]
    })
  },

  methods: {
    /**
     * @method 根据教师姓名查询
     */
    submitSearchForm() {
      const realName = this.realName
      if (realName === '') {
        return false
      }
      let tableData = this.tableData
      let resultList = []
      let total = 0
      for (let data of tableData) {
        for (let invigilator of data) {
          if (invigilator.realName.indexOf(realName) >= 0) {
            total++
            resultList.push(invigilator)
          }
        }
      }
      this.total = total
      this.pageNo = 1
      this.pageSize = total
      this.showData = resultList
    },

    /**
     * @method 点击添加监考教师按钮，弹出添加dialog
     */
    clickAddBtn() {
      this.invigilatorFormTitle = '添加监考教师'
      this.invigilatorFormVisible = true
    },

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
        this.reload()
        this.$message.success('导入成功')
      })
    },

    /**
     * @method 点击编辑监考教师按钮，弹出编辑dialog
     */
    clickEditBtn(row) {
      this.invigilatorFormTitle = '编辑监考教师信息'
      this.invigilatorForm.invigilatorId = row.invigilatorId
      this.invigilatorForm.realName = row.realName
      this.invigilatorForm.contact = row.contact
      this.disabled = true
      this.invigilatorFormVisible = true
    },

    /**
     * @method 提交添加/编辑考点表单
     */
    submitInvigilatorForm() {
      const realName = this.invigilatorForm.realName
      const contact = this.invigilatorForm.contact
      if (realName === '' || contact === '') {
        this.$alert('表单信息未填写完整', '提示')
        return false
      }
      if (contact.length != 11 || isNaN(contact)) {
        this.$alert('手机号格式不对', '提示')
        return false
      }
      if (this.invigilatorFormTitle === '编辑监考教师信息') {
        const invigilatorId = this.invigilatorForm.invigilatorId
        const data = { invigilatorId, realName, contact }
        api.updateInvigilator(data).then(res => {
          this.invigilatorFormVisible = false
          this.reload()
          this.$message.success('编辑成功')
        })
      } else if (this.invigilatorFormTitle === '添加监考教师') {
        const data = { realName, contact }
        api.addInvigilator(data).then(res => {
          this.invigilatorFormVisible = false
          this.reload()
          this.$message.success('添加成功')
        })
      } else {
        console.error('error')
      }
    },

    /**
     * @method 关闭添加/编辑dialog
     */
    handleCancel() {
      this.invigilatorFormVisible = false
      this.invigilatorFormTitle = ''
      this.invigilatorForm.invigilatorId = ''
      this.invigilatorForm.realName = ''
      this.invigilatorForm.contact = ''
      this.disabled = false
    },

    /**
     * @method 点击删除监考教师按钮，准备删除
     */
    clickDelBtn(invigilatorId) {
      this.$confirm('此操作将删除该教师信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = { invigilatorId }
        api.delInvigilator(params).then(res => {
          this.reload()
          this.$message.success('删除成功')
        })
      }).catch(() => {
        this.$message.info('取消删除')
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
.inline-block {
  display: inline-block;
}

.form-container {
  float: right;
}

.el-button {
  margin-right: 10px;
}

.el-input + .el-button {
  margin-left: 10px;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
