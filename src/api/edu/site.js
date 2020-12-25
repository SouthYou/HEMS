import request from '@/utils/request'

export function uploadExcel(data) {
  return request({
    url: '/site/excel',
    method: 'post',
    data
  })
}

export function getSiteByExamName(params) {
  return request({
    url: '/site/examName',
    method: 'get',
    params
  })
}

export function getSite(params) {
  return request({
    url: '/site',
    method: 'get',
    params
  })
}

export function addSite(data) {
  return request({
    url: '/site',
    method: 'post',
    data
  })
}

export function updateSite(data) {
  return request({
    url: '/site',
    method: 'patch',
    data
  })
}

export function delSite(params) {
  return request({
    url: '/site',
    method: 'delete',
    params
  })
}