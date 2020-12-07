import request from '@/utils/request'

export function getEnroll(params) {
  return request({
    url: '/enroll',
    method: 'get',
    params
  })
}

export function updateStatus(data) {
  return request({
    url: '/enroll',
    method: 'patch',
    data
  })
}