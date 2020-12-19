import request from '@/utils/request'

export function uploadExcel(data) {
  return request({
    url: '/score/excel',
    method: 'post',
    data
  })
}