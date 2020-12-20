const Mock = require('mockjs')

module.exports = [
  {
    url: '/invigilator/excel',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },

  {
    url: '/invigilator',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          {
            total: 6,
            tableData: [
              [{
                invigilatorId: 'in_1001',
                realName: '张三',
                contact: '13784636468',
              }, {
                invigilatorId: 'in_1002',
                realName: '李四',
                contact: '13784636468',
              }, {
                invigilatorId: 'in_1003',
                realName: '张三',
                contact: '13784636468',
              }, {
                invigilatorId: 'in_1004',
                realName: '张三',
                contact: '13784636468',
              }, {
                invigilatorId: 'in_1005',
                realName: '张三',
                contact: '13784636468',
              }],

              [{
                invigilatorId: 'in_1006',
                realName: '张三',
                contact: '13784636468',
              }]
            ]
          }
        )
      }
    }
  },

  {
    url: '/invigilator',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },

  {
    url: '/invigilator',
    type: 'patch',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },

  {
    url: '/invigilator',
    type: 'delete',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },
]