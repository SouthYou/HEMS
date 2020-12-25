const Mock = require('mockjs')

module.exports = [
  {
    url: '/arrange/site',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          {
            total: 6,
            invigilatorList: ['老师1','老师2'],
            tableData: [
              [{
                candidateId: 'ca1001',
                realName: '张三',
                candidateNo: '10101010101',
                examName: '初级程序员',
                site: 'B101',
                session: '2021-01-01 8:00-10:00',
                seat: '28'
              }, {
                candidateId: 'ca1001',
                realName: '李四',
                candidateNo: '10101010101',
                examName: '初级程序员',
                site: 'B101',
                session: '2021-01-10 8:00-10:00',
                seat: '28'
              }, {
                candidateId: 'ca1001',
                realName: '张三',
                candidateNo: '10101010101',
                examName: '初级程序员',
                site: 'B101',
                session: '2021-01-01 8:00-10:00',
                seat: '28'
              }, {
                candidateId: 'ca1001',
                realName: '张三',
                candidateNo: '10101010101',
                examName: '初级程序员',
                site: 'B101',
                session: '2021-01-01 8:00-10:00',
                seat: '28'
              }, {
                candidateId: 'ca1001',
                realName: '张三',
                candidateNo: '10101010101',
                examName: '初级程序员',
                site: 'B101',
                session: '2021-01-01 8:00-10:00',
                seat: '28'
              }],

              [{
                candidateId: 'ca1001',
                realName: '张三',
                candidateNo: '10101010101',
                examName: '初级程序员',
                site: 'B101',
                session: '2021-01-01 8:00-10:00',
                seat: '28'
              }]
            ]
          }
        )
      }
    }
  },
   
  {
    url: '/arrange/candidate',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          {
            total: 6,
            tableData: [
              [{
                candidateId: 'ca1001',
                realName: '张三',
                candidateNo: '10101010101',
                examName: '初级程序员',
                site: 'B101',
                session: '2021-01-01 8:00-10:00',
                seat: '28'
              }, {
                candidateId: 'ca1001',
                realName: '李四',
                candidateNo: '10101010101',
                examName: '初级程序员',
                site: 'B101',
                session: '2021-01-10 8:00-10:00',
                seat: '28'
              }, {
                candidateId: 'ca1001',
                realName: '张三',
                candidateNo: '10101010101',
                examName: '初级程序员',
                site: 'B101',
                session: '2021-01-01 8:00-10:00',
                seat: '28'
              }, {
                candidateId: 'ca1001',
                realName: '张三',
                candidateNo: '10101010101',
                examName: '初级程序员',
                site: 'B101',
                session: '2021-01-01 8:00-10:00',
                seat: '28'
              }, {
                candidateId: 'ca1001',
                realName: '张三',
                candidateNo: '10101010101',
                examName: '初级程序员',
                site: 'B101',
                session: '2021-01-01 8:00-10:00',
                seat: '28'
              }],

              [{
                candidateId: 'ca1001',
                realName: '张三',
                candidateNo: '10101010101',
                examName: '初级程序员',
                site: 'B101',
                session: '2021-01-01 8:00-10:00',
                seat: '28'
              }]
            ]
          }
        )
      }
    }
  },
   
  {
    url: '/arrange',
    type: 'patch',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },
   
  {
    url: '/arrange',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  }
   
]