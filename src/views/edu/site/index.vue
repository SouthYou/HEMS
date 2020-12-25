<template>
  <div class="app-container">
    <!-- 搜索部分 -->
    <el-button type="success" icon="el-icon-plus" @click="clickAddBtn()">添加考点</el-button>
    <el-upload class="inline-block"
      action="#"
      :show-file-list="false"
      accept=".xls,.xlsx"
      :before-upload="beforeFileUpload"
      :http-request="handleFileUpload">
      <el-button type="success" icon="el-icon-upload">批量导入考点</el-button>
    </el-upload>
    <div class="form-container">
      <el-select v-model="searchForm.building" placeholder="选择教学楼" style="width:150px">
        <el-option label="A楼" value="A"></el-option>
        <el-option label="B楼" value="B"></el-option>
        <el-option label="C楼" value="C"></el-option>
        <el-option label="D楼" value="D"></el-option>
        <el-option label="E楼" value="E"></el-option>
      </el-select>
      <el-select v-model="searchForm.floor" placeholder="选择楼层" style="width:150px">
        <el-option label="1层" value="1"></el-option>
        <el-option label="2层" value="2"></el-option>
        <el-option label="3层" value="3"></el-option>
        <el-option label="4层" value="4"></el-option>
        <el-option label="5层" value="5"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="submitSearchForm()">查询</el-button>
    </div>

    <el-divider></el-divider>

    <!-- 结果部分 -->
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="building" label="教学楼"></el-table-column>
        <el-table-column prop="floor" label="楼层"></el-table-column>
        <el-table-column prop="classroom" label="教室"></el-table-column>
        <el-table-column prop="capacity" label="容量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" size="small" @click="clickEditBtn(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="clickDelBtn(scope.row.siteId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加 / 编辑考点dialog -->
    <el-dialog :title="siteFormTitle" :visible.sync="siteFormVisible" width="420px" :before-close="handleCancel">
      <el-form :model="siteForm" label-width="60px" ref="siteForm">
        <el-form-item label="教学楼">
          <el-select v-model="siteForm.building" style="width:200px" placeholder="选择教学楼" :disabled="disabled">
            <el-option label="A楼" value="A"></el-option>
            <el-option label="B楼" value="B"></el-option>
            <el-option label="C楼" value="C"></el-option>
            <el-option label="D楼" value="D"></el-option>
            <el-option label="E楼" value="E"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="楼层">
          <el-select v-model="siteForm.floor" style="width:200px" placeholder="选择楼层" :disabled="disabled">
            <el-option label="1层" value="1"></el-option>
            <el-option label="2层" value="2"></el-option>
            <el-option label="3层" value="3"></el-option>
            <el-option label="4层" value="4"></el-option>
            <el-option label="5层" value="5"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="教室">
          <el-input v-model="siteForm.classroom" style="width:200px" :disabled="disabled"></el-input>
          <span class="red rt">(例：A101)</span>
        </el-form-item>

        <el-form-item label="容量">
          <el-slider
            v-model="siteForm.capacity"
            :min="20"
            :max="50"
            show-input>
          </el-slider>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="submitSiteForm()">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/edu/site'

export default {
  // inject: ['reload'],
  data() {
    return {
      /* 搜索表单 */
      searchForm: {
        building: '',
        floor: '',
      },
      /* 添加/编辑考点表单 */
      disabled: false,
      siteFormVisible: false,
      siteFormTitle: '',
      siteForm: {
        siteId: '',
        building: '',
        floor: '',
        classroom: '',
        capacity: 30,
      },
      /* 表格数据 */
      tableData: []
    }
  },

  methods: {
    /**
     * @method 提交搜索表单
     */
    submitSearchForm() {
      if (this.searchForm.building === '') {
        this.$alert('未选择教学楼', '提示')
        return false
      }
      const building = this.searchForm.building
      const floor = this.searchForm.floor
      const params = { building, floor }
      api.getSite(params).then(res => {
        const { data } = res
        if (data.length === 0) {
          this.$message.info('没有查询到数据')
        }
        this.tableData = data
      })
    },

    /**
     * @method 刷新表格数据
     */
    refreshData() {
      if (this.searchForm.building === '') {
        return false
      }
      const building = this.searchForm.building
      const floor = this.searchForm.floor
      const params = { building, floor }
      api.getSite(params).then(res => {
        const { data } = res
        this.tableData = data
      })
    },

    /**
     * @method 点击添加考点按钮，弹出添加dialog
     */
    clickAddBtn() {
      this.disabled = false
      this.siteFormTitle = '添加考点'
      this.siteFormVisible = true
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
        const { data } = res
        this.$message.success('导入成功')
      })
    },

    /**
     * @method 点击编辑按钮，弹出编辑dialog
     */
    clickEditBtn(row) {
      this.disabled = true
      this.siteFormTitle = '编辑考点'
      this.siteForm.siteId = row.siteId
      this.siteForm.building = row.building
      this.siteForm.floor = row.floor
      this.siteForm.classroom = row.classroom
      this.siteForm.capacity = row.capacity
      this.siteFormVisible = true
    },

    /**
     * @method 提交添加/编辑考点表单
     */
    submitSiteForm() {
      const building = this.siteForm.building
      const floor = this.siteForm.floor
      const classroom = this.siteForm.classroom
      const capacity = this.siteForm.capacity
      if (building === '' || floor === '' || classroom === '') {
        this.$alert('表单信息未填写完整', '提示')
        return false
      }
      if (this.siteFormTitle === '编辑考点') {
        const siteId = this.siteForm.siteId
        const data = { siteId, building, floor, classroom, capacity }
        api.updateSite(data).then(res => {
          const { data } = res
          this.siteFormVisible = false
          this.refreshData()
          this.$message.success('编辑成功')
        })
      } else if (this.siteFormTitle === '添加考点') {
        const data = { building, floor, classroom, capacity }
        api.addSite(data).then(res => {
          const { data } = res
          this.siteFormVisible = false
          this.refreshData()
          this.$message.success('添加成功')
        })
      } else {
        console.error('error')
      }
      this.siteForm.siteId = ''
      this.siteForm.building = ''
      this.siteForm.floor = ''
      this.siteForm.classroom = ''
      this.siteForm.capacity = ''
    },

    /**
     * @method 关闭添加/编辑dialog
     */
    handleCancel() {
      this.siteFormVisible = false
      this.siteFormTitle = ''
      this.siteForm.siteId = ''
      this.siteForm.building = ''
      this.siteForm.floor = ''
      this.siteForm.classroom = ''
      this.siteForm.capacity = 30
    },

    /**
     * @method 点击删除按钮，准备删除考点
     */
    clickDelBtn(siteId) {
      this.$confirm('此操作将删除该考点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = { siteId }
        api.delSite(params).then(res => {
          const { data } = res
          this.refreshData()
          this.$message.success('删除成功')
        })
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.red {
  color: #F56C6C;
}

.rt {
  float: right;
}

.inline-block {
  display: inline-block;
}

.form-container {
  float: right;
  padding: 10px;
}

.el-button {
  margin-right: 10px;
}

.el-select + .el-select {
  margin-left: 10px;
}

.el-select + .el-button {
  margin-left: 10px;
}
</style>
