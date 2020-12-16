<template>
  <div class="app-container">
    <!-- 搜索部分 -->
    <div class="form-container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-select v-model="searchForm.building" placeholder="选择教学楼" style="width:150px;">
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
            <el-option label="C" value="C"></el-option>
            <el-option label="D" value="D"></el-option>
            <el-option label="E" value="E"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select v-model="searchForm.floor" placeholder="选择楼层" style="width:150px;">

          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitSearchForm()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button type="success" icon="el-icon-plus">添加考点</el-button>
      <el-button type="success" icon="el-icon-upload">批量导入考点</el-button>
    </div>

    <!-- 结果部分 -->
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="site" label="考点"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" size="small" @click="clickModifyBtn(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="clickDelBtn(scope.row)">删除</el-button>
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
      searchForm: {
        building: '',
        floor: '',
      },
      tableData: [{
        site: 'A101',
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

    clickDelBtn() {

    },
  }
}
</script>

<style lang="scss" scoped>

</style>
