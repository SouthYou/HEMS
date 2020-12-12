import request from '@/utils/request'

export function getStatus(params) {
  return request({
    url: '/exam/status',
    method: 'get',
    params
  })
}

export function updateStatus(data) {
  return request({
    url: '/exam/status',
    method: 'patch',
    data
  })
}