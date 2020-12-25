const Mock = require('mockjs')

module.exports = [
  {
    url: '/site/excel',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },

  {
    url: '/site/examName',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          ['A101','A102','A105']
        )
      }
    }
  },

  {
    url: '/site',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          [{
            siteId: 's1001',
            building: 'A',
            floor: '1',
            classroom: 'A101',
            capacity: 30
          }, {
            siteId: 's1002',
            building: 'A',
            floor: '2',
            classroom: 'A202',
            capacity: 20
          }, {
            siteId: 's1003',
            building: 'A',
            floor: '1',
            classroom: 'A105',
            capacity: 25
          }, {
            siteId: 's1004',
            building: 'A',
            floor: '1',
            classroom: 'A109',
            capacity: 25
          }, {
            siteId: 's1005',
            building: 'A',
            floor: '1',
            classroom: 'A104',
            capacity: 30
          }, {
            siteId: 's1006',
            building: 'A',
            floor: '1',
            classroom: 'A108',
            capacity: 30
          }, {
            siteId: 's1007',
            building: 'A',
            floor: '1',
            classroom: 'A110',
            capacity: 30
          }]
        )
      }
    }
  },
  
  {
    url: '/site',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },
  
  {
    url: '/site',
    type: 'patch',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },

  {
    url: '/site',
    type: 'delete',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  }
]