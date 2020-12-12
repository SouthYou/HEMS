const Mock = require('mockjs')

module.exports = [
  {
    url: '/apply/accept',
    type: 'patch',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },

  {
    url: '/apply/refuse',
    type: 'patch',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },
  
  {
    url: '/apply',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          {
            total: 6,
            tableData: [
              [{
                applyId: 'ap1001',
                candidateId: 'ca1001',
                realName: '张三',
                description: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'
              }, {
                applyId: 'ap1001',
                candidateId: 'ca1001',
                realName: '张三',
                description: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'
              }, {
                applyId: 'ap1001',
                candidateId: 'ca1001',
                realName: '张三',
                description: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'
              }, {
                applyId: 'ap1001',
                candidateId: 'ca1001',
                realName: '张三',
                description: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'
              }, {
                applyId: 'ap1001',
                candidateId: 'ca1001',
                realName: '张三',
                description: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'
              }],

              [{
                applyId: 'ap1001',
                candidateId: 'ca1001',
                realName: '张三',
                description: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'
              }]
            ]
          }
        )
      }
    }
  },
]