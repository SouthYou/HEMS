import request from '@/utils/request'

export function getExamName(params) {
  return request({
    url: '/exam/name',
    method: 'get',
    params
  })
}

export function addExamInfo(data) {
  return request({
    url: '/exam',
    method: 'post',
    data
  })
}