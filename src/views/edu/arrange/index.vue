<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-select v-model="searchForm.type" placeholder="选择查询类型" style="width:150px">
            <el-option label="考点" value="site"></el-option>
            <el-option label="考生" value="candidate"></el-option>
          </el-select>
        </el-form-item>

        <template v-if="searchForm.type=='site'">
          <el-form-item>
            <el-select v-model="searchForm.level" placeholder="选择等级" style="width:150px" @change="levelChange()">
              <el-option label="初级" value="1"></el-option>
              <el-option label="中级" value="2"></el-option>
              <el-option label="高级" value="3"></el-option>
            </el-select>
          </el-form-item>
  
          <el-form-item>
              <el-select v-model="searchForm.examName" placeholder="选择考试名称" style="width:150px" @change="examNameChange()">
                <el-option
                  v-for="item in name_options"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          
          <el-form-item>
            <el-select v-model="searchForm.site" placeholder="选择考点" style="width:150px">
              <el-option
                v-for="i in site_options"
                :key="i"
                :label="i"
                :value="i">
              </el-option>
            </el-select>
          </el-form-item>
        </template>

        <el-form-item v-if="searchForm.type=='candidate'">
          <el-input v-model="searchForm.key" placeholder="输入准考证号/姓名"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitSearchForm()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 结果部分 -->
    <div class="margin-bt">
      <span v-if="invigilatorList.length!=0">监考教师：{{invigilatorList[0]}}、{{invigilatorList[1]}}</span>
      <el-table :data="showData" border style="width: 100%">
        <el-table-column prop="realName" label="姓名"></el-table-column>
        <el-table-column prop="candidateNo" label="准考证号"></el-table-column>
        <el-table-column prop="examName" label="考试名"></el-table-column>
        <el-table-column prop="site" label="考点"></el-table-column>
        <el-table-column prop="session" label="场次"></el-table-column>
        <el-table-column prop="seat" label="座位号"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="clickModifyBtn(scope.row)">编辑</el-button>
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

    <!-- 编辑考生考点dialog -->
    <el-dialog title="更改考点" :visible.sync="dialogVisible" width="390px" :before-close="handleCancel">
      <el-form :model="dialogForm" label-width="70px" ref="dialogForm">
        <el-form-item label="准考证号">
          <el-input disabled v-model="dialogForm.candidateNo"></el-input>
        </el-form-item>

        <el-form-item label="考点">
          <el-select v-model="dialogForm.site" placeholder="选择考点" style="width:280px">
            <el-option
              v-for="i in dialog_site_options"
              :key="i"
              :label="i"
              :value="i">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="submitDialogForm()">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/edu/arrange'
import { getExamName } from '@/api/admin/exam'
import { getSiteByExamName } from '@/api/edu/site'

export default {
  data() {
    return {
      // 搜索表单
      name_options: [],
      site_options: [],
      searchForm: {
        type: '',
        level: '',
        examName: '',
        site: '',
        key: '',
      },
      // 监考教师
      invigilatorList: [],
      // 表格数据
      tableData: [],
      showData: [],
      pageNo: 1,
      pageSize: 5,
      total: 0,
      // dialog
      dialogVisible: false,
      dialog_site_options: [],
      dialogForm: {
        candidateNo: '',
        site: ''
      }
    }
  },

  methods: {
    /**
     * @method 选择考试等级后，从服务端获取该等级下所有的考试名称及相关信息
     */
    levelChange() {
      const level = this.searchForm.level
      getExamName({ level }).then(res => {
        const { data } = res
        this.name_options = data.nameList
      })
    },

    /**
     * @method 选择考试名称后，从服务端获取该考试安排的所有考点
     */
    examNameChange() {
      const examName = this.searchForm.examName
      getSiteByExamName({ examName }).then(res => {
        const { data } = res
        this.site_options = data
      })
    },

    /**
     * @method 提交搜索表单
     */
    submitSearchForm() {
      const site = this.searchForm.site
      const key = this.searchForm.key
      if (site === '' && key === '') {
        this.$alert('表单信息未填写完整', '提示')
        return false
      }
      this.conditionQuery()
    },

    /**
     * @method 条件查询
     */
    conditionQuery() {
      const type = this.searchForm.type
      if (type === 'site') {
        const examName = this.searchForm.examName
        const site = this.searchForm.site
        api.getArrangeBySite({ examName, site }).then(res => {
          const { data } = res
          this.total = data.total
          this.invigilatorList = data.invigilatorList
          this.tableData = data.tableData
          this.showData = this.tableData[0]
        })
      }
      if (type === 'candidate') {
        const key = this.searchForm.key
        api.getArrangeByCandidate({ key }).then(res => {
          const { data } = res
          this.total = data.total
          this.invigilatorList = []
          this.tableData = data.tableData
          this.showData = this.tableData[0]
        })
      }
      this.pageNo = 1
    },

    /**
     * @method 点击编辑按钮
     */
    clickModifyBtn(row) {
      this.dialogForm.candidateNo = row.candidateNo
      this.dialogForm.site = row.site
      let examName = row.examName
      examName = examName.substr(2, examName.length)
      getSiteByExamName({ examName }).then(res => {
        const { data } = res
        this.dialog_site_options = data
      })
      this.dialogVisible = true
    },

    /**
     * @method 提交编辑表单
     */
    submitDialogForm() {
      const candidateNo = this.dialogForm.candidateNo
      const site = this.dialogForm.site
      const data = { candidateNo, site }
      api.changeSite(data).then(res => {
        this.dialogVisible = false
        this.conditionQuery()
        this.$message.success('更改成功')
      })
    },

    /**
     * @method 编辑dialog取消提交
     */
    handleCancel() {
      this.dialogVisible = false
      this.dialogForm.candidateNo = ''
      this.dialogForm.site = ''
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
.margin-bt {
  margin-bottom: 20px;
}

.margin-rt {
  margin-right: 10px;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
