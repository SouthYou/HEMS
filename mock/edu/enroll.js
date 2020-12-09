const Mock = require('mockjs')

module.exports = [
  {
    url: '/enroll/status',
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
                level: '初级',
                examName: '程序员',
                enrollId: 'en1001',
                candidateId: 'ca1001',
                realName: '张三',
                gender: '男',
                contact: '88888888',
                email: '888888@qq.com',
                eduBack: '本科',
                homeAddress: 'xx省xx市xx区xxx',
                status: '已报名',
              }, {
                level: '初级',
                examName: '程序员',
                enrollId: 'en1001',
                candidateId: 'ca1001',
                realName: '李四',
                gender: '男',
                contact: '88888888',
                email: '888888@qq.com',
                eduBack: '本科',
                homeAddress: 'xx省xx市xx区xxx',
                status: '未缴费',
              }, {
                level: '初级',
                examName: '程序员',
                enrollId: 'en1001',
                candidateId: 'ca1001',
                realName: '张三',
                gender: '男',
                contact: '88888888',
                email: '888888@qq.com',
                eduBack: '本科',
                homeAddress: 'xx省xx市xx区xxx',
                status: '已报名',
              }, {
                level: '初级',
                examName: '程序员',
                enrollId: 'en1001',
                candidateId: 'ca1001',
                realName: '张三',
                gender: '男',
                contact: '88888888',
                email: '888888@qq.com',
                eduBack: '本科',
                homeAddress: 'xx省xx市xx区xxx',
                status: '已报名',
              }, {
                level: '初级',
                examName: '程序员',
                enrollId: 'en1001',
                candidateId: 'ca1001',
                realName: '张三',
                gender: '男',
                contact: '88888888',
                email: '888888@qq.com',
                eduBack: '本科',
                homeAddress: 'xx省xx市xx区xxx',
                status: '已报名',
              }],

              [{
                level: '初级',
                examName: '程序员',
                enrollId: 'en1001',
                candidateId: 'ca1001',
                realName: '张三',
                gender: '男',
                contact: '88888888',
                email: '888888@qq.com',
                eduBack: '本科',
                homeAddress: 'xx省xx市xx区xxx',
                status: '已报名',
              }]
            ]
          }
        )
      }
    }
  },
]