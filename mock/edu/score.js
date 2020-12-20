const Mock = require('mockjs')

module.exports = [
  {
    url: '/score/excel',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          [
            {
              candidateNo: 'can_101',
              realName: '张三',
              examNo: 'ex_101',
              examName: '程序员',
              score: '80',
              pass: '合格'
            },
            {
              candidateNo: 'can_102',
              realName: '李四',
              examNo: 'ex_101',
              examName: '程序员',
              score: '50',
              pass: '不合格'
            },
            {
              candidateNo: 'can_103',
              realName: '王五',
              examNo: 'ex_101',
              examName: '程序员',
              score: '80',
              pass: '合格'
            },
            {
              candidateNo: 'can_104',
              realName: '赵六',
              examNo: 'ex_101',
              examName: '程序员',
              score: '80',
              pass: '合格'
            }
          ]
        )
      }
    }
  },

]