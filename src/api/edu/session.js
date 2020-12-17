import request from '@/utils/request'

export function getSession() {
  return request({
    url: '/session',
    method: 'get'
  })
}

export function updateSession(data) {
  return request({
    url: '/session',
    method: 'patch',
    data
  })
}