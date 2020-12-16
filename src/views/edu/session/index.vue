<template>
  <div class="app-container">
    <el-row :gutter="50">
      <el-col :span="8" v-for="(session, i) in sessionList" :key="i">
        <SessionCard style="margin-bottom: 20px;"
          :examName="session.examName"
          :examStart="session.examStart"
          :examEnd="session.examEnd"
          :interval="session.interval"
          @click="clickEditBtn(session)">
        </SessionCard>
      </el-col>
    </el-row>

    <el-dialog title="修改考试时间" :visible.sync="dialogVisible" width="500px" :before-close="handleCancel">
      <el-form :model="modifyForm" label-position="left" label-width="78px" ref="modifyForm">
        <el-form-item label="考试日期">
          <el-date-picker style="width: 172px"
            v-model="modifyForm.examDate"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="考试时间">
          <el-row >
            <el-col :span="12">
              <el-time-select style="width: 90%"
                placeholder="开考时间"
                v-model="modifyForm.startTime"
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
                placeholder="结束时间"
                v-model="modifyForm.endTime"
                @change="timeChange()"
                :picker-options="{
                  start: '08:00',
                  step: '00:15',
                  end: '18:00',
                  minTime: modifyForm.startTime
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
// import * as api from '@/api/edu/enroll'

export default {
  // inject: ['reload'],
  components: { SessionCard },

  data() {
    return {
      dialogVisible: false,
      modifyForm: {
        examDate: '',
        startTime: '',
        endTime: '',
        interval: ''
      },
      sessionList: [
        {
          examName: '中级软件工程师',
          examStart: '2020年12月25日 9:00',
          examEnd: '2020年12月25日 11:00',
          interval: '2小时'
        },
        {
          examName: '初级程序员',
          examStart: '2020年12月25日 9:00',
          examEnd: '2020年12月25日 11:00',
          interval: '2小时'
        },
        {
          examName: '中级软件工程师',
          examStart: '2020年12月25日 9:00',
          examEnd: '2020年12月25日 11:00',
          interval: '2小时'
        },
        {
          examName: '中级软件工程师',
          examStart: '2020年12月25日 9:00',
          examEnd: '2020年12月25日 11:00',
          interval: '2小时'
        }
      ]
      
    }
  },

  created() {
    
  },

  methods: {
    clickEditBtn(session) {
      this.modifyForm.examStart = session.examStart
      this.modifyForm.examEnd = session.examEnd
      this.modifyForm.interval = session.interval
      this.dialogVisible = true
    },

    timeChange() {
      const startTime = this.modifyForm.startTime
      const endTime = this.modifyForm.endTime
      if (startTime === '' || endTime === '') {
        return false
      }
      const t1 = new Date('2021-01-01 ' + startTime).getTime()
      const t2 = new Date('2021-01-01 ' + endTime).getTime()
      const total = (t2 - t1) / 1000
      if (total < 3600) {
        // xx分钟
        const minute = total / 60
        this.modifyForm.interval = minute + '分钟'
      } else {
        // xx小时xx分钟
        const hour = parseInt(total / 3600)
        const minute = total % 3600 / 60
        this.modifyForm.interval = hour + '小时' + minute + '分钟'
      }
    },

    submitModifyForm() {

    },

    handleCancel() {
      this.$refs['modifyForm'].resetFields()
      this.dialogVisible = false
    },

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
