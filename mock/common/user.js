const tokens = {
  admin: {
    token: 'admin-token'
  },
  eduAdmin: {
    token: 'eduAdmin-token'
  }
}

const users = {
  'admin-token': {
    roles: [
      {
        "roleName": "ROLE_SYSTEM_ADMIN"
      }
    ],
    avatar: 'http://qla6qhdly.hn-bkt.clouddn.com/default_admin_avatar.png',
    accountName: '系统管理员'
  },
  'eduAdmin-token': {
    roles: [
      {
        "roleName": "ROLE_EDU_ADMIN"
      }
    ],
    avatar: 'http://qla6qhdly.hn-bkt.clouddn.com/default_admin_avatar.png',
    accountName: '教务'
  }
}

module.exports = [
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
