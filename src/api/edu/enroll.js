import request from '@/utils/request'

export function updateStatus(data) {
  return request({
    url: '/enroll/status',
    method: 'patch',
    data
  })
}

export function updateEnroll(data) {
  return request({
    url: '/enroll',
    method: 'patch',
    data
  })
}

export function getEnroll(params) {
  return request({
    url: '/enroll',
    method: 'get',
    params
  })
}