<template>
  <div class="app-container">
    <!-- 所有场次信息 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(session, i) in sessionList" :key="i">
        <SessionCard style="margin-bottom: 20px;"
          :examName="session.examName"
          :examDate="session.examDate"
          :examStart="session.examStart"
          :examEnd="session.examEnd"
          :interval="session.interval"
          :status="session.status"
          @click="clickEditBtn(session)">
        </SessionCard>
      </el-col>
    </el-row>
    <!-- 修改场次时间dialog -->
    <el-dialog title="修改考试时间" :visible.sync="dialogVisible" width="500px" :before-close="handleCancel">
      <el-form
        :model="modifyForm"
        label-position="left"
        label-width="78px"
        ref="modifyForm">
        <el-form-item label="考试名称" prop="examName">
          <el-input disabled v-model="modifyForm.examName" style="width: 172px"></el-input>
        </el-form-item>

        <el-form-item label="考试日期">
          <el-date-picker style="width: 172px"
            v-model="modifyForm.examDate"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="考试时间">
          <el-row >
            <el-col :span="12">
              <el-time-select style="width: 90%"
                v-model="modifyForm.examStart"
                placeholder="开考时间"
                @change="timeChange()"
                :picker-options="{
                  start: '08:00',
                  step: '00:15',
                  end: '18:00'
                }">
              </el-time-select>
            </el-col>
            <el-col :span="12">
              <el-time-select style="width: 90%"
                v-model="modifyForm.examEnd"
                placeholder="结束时间"
                @change="timeChange()"
                :picker-options="{
                  start: '08:00',
                  step: '00:15',
                  end: '18:00',
                  minTime: modifyForm.examStart
                }">
              </el-time-select>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="考试时长" prop="interval">
          <el-input disabled v-model="modifyForm.interval" style="width: 172px"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="submitModifyForm()">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SessionCard from '@/components/SessionCard'
import * as api from '@/api/edu/session'

export default {
  inject: ['reload'],
  components: { SessionCard },

  data() {
    return {
      // dialog
      dialogVisible: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      modifyForm: {
        examNo: '',
        examName: '',
        examDate: '',
        examStart: '',
        examEnd: '',
        interval: ''
      },
      // 所有场次信息
      sessionList: []
    }
  },

  created() {
    api.getSession().then(res => {
      const { data } = res
      this.sessionList = data
    })
  },

  methods: {
    /**
     * @method 修改按钮click事件
     */
    clickEditBtn(session) {
      this.modifyForm.examNo = session.examNo
      this.modifyForm.examName = session.examName
      this.modifyForm.examDate = session.examDate
      this.modifyForm.examStart = session.examStart
      this.modifyForm.examEnd = session.examEnd
      this.modifyForm.interval = session.interval + '分钟'
      this.dialogVisible = true
    },
    
    /**
     * @method 时间选择器change事件
     */
    timeChange() {
      const startTime = this.modifyForm.examStart
      const endTime = this.modifyForm.examEnd
      if (startTime === null || endTime === null) {
        this.modifyForm.interval = ''
        return false
      }
      const t1 = new Date('2021-01-01 ' + startTime).getTime()
      const t2 = new Date('2021-01-01 ' + endTime).getTime()
      const minute = (t2 - t1) / 60000
      this.modifyForm.interval = minute + '分钟'
    },

    /**
     * @method 确认更改场次
     */
    submitModifyForm() {
      if (this.modifyForm.examDate === null || this.modifyForm.examStart === null || this.modifyForm.examEnd === null) {
        this.$alert('表单信息未填写完整', '提示')
        return false
      }
      const examNo = this.modifyForm.examNo
      const examStart = this.modifyForm.examDate + ' ' + this.modifyForm.examStart
      const examEnd = this.modifyForm.examDate + ' ' + this.modifyForm.examEnd
      let interval = this.modifyForm.interval
      interval = interval.substr(0, interval.length - 2)
      const data = { examNo, examStart, examEnd, interval }
      api.updateSession(data).then(res => {
        const { code, data } = res
        if (code !== 20000) {
          this.$message.error('更改失败')
          return false
        }
        this.reload()
        this.$message.success('更改成功')
      })
    },

    /**
     * @method 取消更改场次
     */
    handleCancel() {
      this.dialogVisible = false
    }

  }
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.item-title {
  padding-right: 20px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>
