const Mock = require('mockjs')

module.exports = [
  {
    url: '/site/excel',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock()
      }
    }
  },

]