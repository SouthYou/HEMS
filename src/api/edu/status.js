import request from '@/utils/request'

export function getStatus(params) {
  return request({
    url: '/status',
    method: 'get',
    params
  })
}

export function updateStatus(data) {
  return request({
    url: '/status',
    method: 'patch',
    data
  })
}