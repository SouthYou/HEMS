import request from '@/utils/request'

export function getArrangeBySite(params) {
  return request({
    url: '/arrange/site',
    method: 'get',
    params
  })
}

export function getArrangeByCandidate(params) {
  return request({
    url: '/arrange/candidate',
    method: 'get',
    params
  })
}

export function changeSite(data) {
  return request({
    url: '/arrange',
    method: 'patch',
    data
  })
}

export function generateArrange(data) {
  return request({
    url: '/arrange',
    method: 'post',
    data
  })
}
