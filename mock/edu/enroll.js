const Mock = require('mockjs')

module.exports = [
  {
    url: '/enroll',
    type: 'patch',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },
  
  {
    url: '/enroll',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          {
            total: 6,
            tableData: [
              [{
                enrollId: 'en1001',
                candidateId: 'ca1001',
                realName: '张三',
                level: '初级',
                examName: '程序员',
                status: '已报名'
              }, {
                enrollId: 'en1001',
                candidateId: 'ca1001',
                realName: '张三',
                level: '初级',
                examName: '程序员',
                status: '未缴费'
              }, {
                enrollId: 'en1001',
                candidateId: 'ca1001',
                realName: '张三',
                level: '初级',
                examName: '程序员',
                status: '未缴费'
              }, {
                enrollId: 'en1001',
                candidateId: 'ca1001',
                realName: '张三',
                level: '初级',
                examName: '程序员',
                status: '已报名'
              }, {
                enrollId: 'en1001',
                candidateId: 'ca1001',
                realName: '张三',
                level: '初级',
                examName: '程序员',
                status: '已报名'
              }],

              [{
                enrollId: 'en1001',
                candidateId: 'ca1001',
                realName: '张三',
                level: '初级',
                examName: '程序员',
                status: '已报名'
              }]
            ]
          }
        )
      }
    }
  },
]