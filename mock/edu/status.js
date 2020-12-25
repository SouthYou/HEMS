const Mock = require('mockjs')

module.exports = [
  {
    url: '/exam/status',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          {
            total: 6,
            tableData: [
              [{
                examNo: 'ex1001',
                level: '初级',
                examName: '程序员',
                enrollStart: '2020-12-2 8:00',
                enrollEnd: '2020-12-5 18:00',
                examStart: '2020-12-8 8:00',
                examEnd: '2020-12-8 9:30',
                status: '分配中'
              }, {
                examNo: 'ex1001',
                level: '初级',
                examName: '程序员',
                enrollStart: '2020-12-2 8:00',
                enrollEnd: '2020-12-5 18:00',
                examStart: '2020-12-8 8:00',
                examEnd: '2020-12-8 9:30',
                status: '阅卷中'
              }, {
                examNo: 'ex1001',
                level: '初级',
                examName: '程序员',
                enrollStart: '2020-12-2 8:00',
                enrollEnd: '2020-12-5 18:00',
                examStart: '2020-12-8 8:00',
                examEnd: '2020-12-8 9:30',
                status: '阅卷中'
              }, {
                examNo: 'ex1001',
                level: '初级',
                examName: '程序员',
                enrollStart: '2020-12-2 8:00',
                enrollEnd: '2020-12-5 18:00',
                examStart: '2020-12-8 8:00',
                examEnd: '2020-12-8 9:30',
                status: '阅卷中'
              }, {
                examNo: 'ex1001',
                level: '初级',
                examName: '程序员',
                enrollStart: '2020-12-2 8:00',
                enrollEnd: '2020-12-5 18:00',
                examStart: '2020-12-8 8:00',
                examEnd: '2020-12-8 9:30',
                status: '已开考'
              }],

              [{
                examNo: 'ex1001',
                level: '初级',
                examName: '程序员',
                enrollStart: '2020-12-2 8:00',
                enrollEnd: '2020-12-5 18:00',
                examStart: '2020-12-8 8:00',
                examEnd: '2020-12-8 9:30',
                status: '分配中'
              }]
            ]
          }
        )
      }
    }
  },

  {
    url: '/exam/status',
    type: 'patch',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },
]