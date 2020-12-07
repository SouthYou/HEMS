const Mock = require('mockjs')

module.exports = [
  {
    url: '/exam/name',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          {
            nameList: [ '程序员', '网络管理员', '架构师' ],
            detailList: {
              '程序员': {
                examId: 'ex1001',
                capacity: 1000,
                fee: 30,
                passLine: 60
              },
              '网络管理员': {
                examId: 'ex1002',
                capacity: 500,
                fee: 30,
                passLine: 80
              },
              '架构师': {
                examId: 'ex1003',
                capacity: 300,
                fee: 50,
                passLine: 60
              }
            }
          }
        )
      }
    }
  },

  {
    url: '/exam',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  }
]