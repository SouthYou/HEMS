const Mock = require('mockjs')

module.exports = [
  {
    url: '/news',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock([
          {
            img: 'http://qjqawp6m8.hn-bkt.clouddn.com/default.png',
            title: 'xxx考试通知',
            publish_date: '2020-05-02'
          }, {
            img: '',
            title: 'xxx考试通知',
            publish_date: '2020-05-02'
          }, {
            img: '',
            title: 'xxx考试通知',
            publish_date: '2020-05-02'
          }, {
            img: '',
            title: 'xxx考试通知',
            publish_date: '2020-05-02'
          }
        ])
      }
    }
  },
  
  {
    url: '/news/images',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock({
          filename: '1606484943474_58315944_p0.jpg'
        })
      }
    }
  },

  {
    url: '/news/images',
    type: 'delete',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },

  {
    url: '/news',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },

]