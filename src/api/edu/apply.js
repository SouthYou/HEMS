import request from '@/utils/request'

export function acceptApply(data) {
  return request({
    url: '/apply/accept',
    method: 'patch',
    data
  })
}

export function refuseApply(data) {
  return request({
    url: '/apply/refuse',
    method: 'patch',
    data
  })
}

export function getApply(params) {
  return request({
    url: '/apply',
    method: 'get',
    params
  })
}