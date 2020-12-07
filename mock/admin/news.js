const Mock = require('mockjs')

module.exports = [
  {
    url: '/news/image',
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
    url: '/news/image',
    type: 'delete',
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
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: Mock.mock(
          {
            total: 5,
            tableData: [
              [{
                newsId: '101',
                title: 'xxx考试发布',
                content: '11111111',
                coverImg: 'http://qjqawp6m8.hn-bkt.clouddn.com/default.png',
                publishDate: '2020-11-28'
              }, {
                newsId: '102',
                title: 'xxx考试发布',
                content: '222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
                coverImg: 'http://qjqawp6m8.hn-bkt.clouddn.com/default.png',
                publishDate: '2020-11-28'
              }, {
                newsId: '103',
                title: 'xxx考试发布',
                content: '3333333333333',
                coverImg: 'http://qjqawp6m8.hn-bkt.clouddn.com/default.png',
                publishDate: '2020-11-28'
              }],

              [{
                newsId: '104',
                title: 'xxx考试发布',
                content: '444444444444',
                coverImg: 'http://qjqawp6m8.hn-bkt.clouddn.com/default.png',
                publishDate: '2020-11-28'
              }, {
                newsId: '105',
                title: 'xxx考试发布',
                content: '55555555555555',
                coverImg: 'http://qjqawp6m8.hn-bkt.clouddn.com/default.png',
                publishDate: '2020-11-28'
              }]
            ]
          }
        )
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

  {
    url: '/news',
    type: 'patch',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  },

  {
    url: '/news',
    type: 'delete',
    response: config => {
      return {
        code: 20000,
        data: 'mock success'
      }
    }
  }
]