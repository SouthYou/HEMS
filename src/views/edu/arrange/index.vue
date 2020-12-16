<template>
  <div class="app-container">
    <!-- 搜索部分 -->
    <div class="form-container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-select v-model="searchForm.type" placeholder="选择查询类型" style="width:150px;">
            <el-option label="考点" value="site"></el-option>
            <el-option label="考生" value="candidate"></el-option>
          </el-select>
        </el-form-item>

        <template v-if="searchForm.type=='site'">
          <el-form-item>
            <el-select v-model="searchForm.level" placeholder="选择等级" style="width:150px;">
    
            </el-select>
          </el-form-item>
  
          <el-form-item>
            <el-select v-model="searchForm.examName" placeholder="选择考试名称" style="width:150px;">
    
            </el-select>
          </el-form-item>
          
          <el-form-item>
            <el-select v-model="searchForm.site" placeholder="选择考点" style="width:150px;">
    
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
    <div class="table-container">
      <span>监考教师：xxxx， xxxx</span>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="a" label="姓名"></el-table-column>
        <el-table-column prop="b" label="准考证号"></el-table-column>
        <el-table-column prop="c" label="考试名"></el-table-column>
        <el-table-column prop="d" label="考点"></el-table-column>
        <el-table-column prop="e" label="场次"></el-table-column>
        <el-table-column prop="f" label="座位号"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="clickModifyBtn(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import * as api from '@/api/edu/enroll'

export default {
  // inject: ['reload'],
  data() {
    return {
      // 搜索表单
      searchForm: {
        type: '',
        level: '',
        examName: '',
        site: '',
        key: '',
      },
      // 表格数据
      tableData: [{
        a: '张三',
        b: '101010010',
        c: '初级程序员',
        d: 'B202',
        e: '12-25 9:00',
        f: '28'
      }]
    }
  },

  created() {
    
  },

  methods: {
    submitSearchForm() {

    },

    clickModifyBtn() {

    },
  }
}
</script>

<style lang="scss" scoped>

</style>
