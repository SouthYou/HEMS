import request from '@/utils/request'

export function uploadExcel(data) {
  return request({
    url: '/invigilator/excel',
    method: 'post',
    data
  })
}

export function getInvigilator(params) {
  return request({
    url: '/invigilator',
    method: 'get',
    params
  })
}

export function addInvigilator(data) {
  return request({
    url: '/invigilator',
    method: 'post',
    data
  })
}

export function updateInvigilator(data) {
  return request({
    url: '/invigilator',
    method: 'patch',
    data
  })
}

export function delInvigilator(params) {
  return request({
    url: '/invigilator',
    method: 'delete',
    params
  })
}