const Mock = require('mockjs')

module.exports = [
  {
    url: '/session',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          [
            {
                examNo: 'ex1001',
                examName: '中级软件工程师',
                examDate: '2020-12-25',
                examStart: '9:00',
                examEnd: '11:00',
                interval: '120',
                status: '分配中'
            },
            {
                examNo: 'ex1002',
                examName: '初级程序员',
                examDate: '2021-01-12',
                examStart: '15:00',
                examEnd: '16:00',
                interval: '60',
                status: '分配中'
            },
            {
                examNo: 'ex1003',
                examName: '中级软件工程师',
                examDate: '2021-01-13',
                examStart: '9:00',
                examEnd: '11:00',
                interval: '120',
                status: '分配中'
            },
            {
                examNo: 'ex1004',
                examName: '中级软件工程师',
                examDate: '2021-01-13',
                examStart: '9:00',
                examEnd: '11:00',
                interval: '120',
                status: '分配中'
            },
            {
                examNo: 'ex1005',
                examName: '中级软件工程师',
                examDate: '2020-12-25',
                examStart: '9:00',
                examEnd: '11:00',
                interval: '120',
                status: '分配中'
            }
          ]
        )
      }
    }
  },
  
  {
    url: '/session',
    type: 'patch',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },
]