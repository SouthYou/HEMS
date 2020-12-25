<template>
  <div class="app-container">
    <el-card shadow="never" class="form-card">
      <el-form label-width="96px" :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="考试等级">
              <el-select v-model="form.level" placeholder="请选择" style="width:88%" @change="levelChange()">
                <el-option
                  v-for="item in level_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="考试名称">
              <el-select v-model="form.examName" placeholder="请选择" style="width:88%" @change="nameChange()">
                <el-option
                  v-for="item in name_options"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="报名开始时间">
          <el-row>
            <el-col :span="10">
              <el-date-picker
                v-model="time.enrollStartDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                style="width:90%">
              </el-date-picker>
            </el-col>
            <el-col :span="10">
              <el-time-select
                v-model="time.enrollStartTime"
                :picker-options="picker_options"
                placeholder="选择时间"
                style="width:90%">
              </el-time-select>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="报名截止时间">
          <el-row>
            <el-col :span="10">
              <el-date-picker
                v-model="time.enrollEndDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                style="width:90%">
              </el-date-picker>
            </el-col>
            <el-col :span="10">
              <el-time-select
                v-model="time.enrollEndTime"
                :picker-options="picker_options"
                placeholder="选择时间"
                style="width:90%">
              </el-time-select>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="考试开始时间">
          <el-row>
            <el-col :span="10">
              <el-date-picker
                v-model="time.examStartDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                style="width:90%">
              </el-date-picker>
            </el-col>
            <el-col :span="10">
              <el-time-select
                v-model="time.examStartTime"
                :picker-options="picker_options"
                placeholder="选择时间"
                style="width:90%">
              </el-time-select>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="考试结束时间">
          <el-row>
            <el-col :span="10">
              <el-date-picker
                v-model="time.examEndDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                style="width:90%">
              </el-date-picker>
            </el-col>
            <el-col :span="10">
              <el-time-select
                v-model="time.examEndTime"
                :picker-options="picker_options"
                placeholder="选择时间"
                style="width:90%">
              </el-time-select>
            </el-col>
          </el-row>
        </el-form-item>

        <el-row>
          <el-col :span="8">
            <el-form-item label="考生容量">
              <el-input v-model="form.capacity" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
  
          <el-col :span="8">
            <el-form-item label="及格线">
              <el-input v-model="form.passLine" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="考试费用">
          <el-input v-model="form.fee" style="width:20%"></el-input>元
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import * as api from '@/api/admin/exam'

export default {
  inject: ['reload'],
  data() {
    return {
      // 表单设置（下拉框、时间选择器）
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
      name_options: [],
      default_options: [],
      picker_options: {
        start: '08:00',
        step: '00:30',
        end: '18:00'
      },
      // 表单数据 -------------------
      // 这代码烂到无法直视，放弃治疗┑(￣Д ￣)┍
      time: {
        enrollStartDate: '',
        enrollStartTime: '',
        enrollEndDate: '',
        enrollEndTime: '',
        examStartDate: '',
        examStartTime: '',
        examEndDate: '',
        examEndTime: '',
      },
      form: {
        examId: '',
        level: '',
        examName: '',
        enrollStart: '',
        enrollEnd: '',
        examStart: '',
        examEnd: '',
        capacity: '',
        fee: '',
        passLine: ''
      }
    }
  },

  methods: {
    /**
     * @method 选择考试等级后，从服务端获取该等级下所有的考试名称及相关信息
     */
    levelChange() {
      const level = this.form.level
      api.getExamName({ level }).then(res => {
        const { data } = res
        this.name_options = data.nameList
        this.default_options = data.detailList
      })
    },

    /**
     * @method 选择考试名称后，将考试相关默认信息填入表单
     */
    nameChange() {
      const ops = this.default_options
      const i = this.form.examName
      this.form.examId = ops[i].examId
      this.form.capacity = ops[i].capacity
      this.form.fee = ops[i].fee
      this.form.passLine = ops[i].passLine
    },

    /**
     * @method 提交表单
     */
    submitForm() {
      this.form.enrollStart = this.time.enrollStartDate + ' ' + this.time.enrollStartTime
      this.form.enrollEnd = this.time.enrollEndDate + ' ' + this.time.enrollEndTime
      this.form.examStart = this.time.examStartDate + ' ' + this.time.examStartTime
      this.form.examEnd = this.time.examEndDate + ' ' + this.time.examEndTime
      for (let key in this.time) {
        if (this.time[key] === '') {
          this.$alert('表单信息未填写完整', '提示')
          return false
        }
      }
      for (let key in this.form) {
        if (this.form[key] === '' || this.form[key] === ' ') {
          this.$alert('表单信息未填写完整', '提示')
          return false
        }
      }
      const currentTime = parseTime(new Date()).substring(0, 16)
      if (this.form.enrollStart <= currentTime) {
        this.$alert('报名开始时间应晚于现在', '提示')
        return false
      }
      if (this.form.enrollEnd <= this.form.enrollStart) {
        this.$alert('报名截止时间应晚于报名开始时间', '提示')
        return false
      }
      if (this.form.examStart <= this.form.enrollEnd) {
        this.$alert('考试开始时间应晚于报名截止时间', '提示')
        return false
      }
      if (this.form.examEnd <= this.form.examStart) {
        this.$alert('考试结束时间应晚于考试开始时间', '提示')
        return false
      }
      const data = this.form
      console.log(data)
      api.addExamInfo(data).then(res => {
        const { data } = res
        this.$message.success('提交成功')
        this.reload()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  display:flex;
  justify-content:center;
}

.form-card {
  width: 800px;
}
</style>
