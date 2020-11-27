import request from '@/utils/request'

export function getNews() {
  return request({
    url: '/news',
    method: 'get'
  })
}

export function uploadImage(data) {
  return request({
    url: '/news/images',
    method: 'post',
    data
  })
}

export function delImage(data) {
  return request({
    url: '/news/images',
    method: 'delete',
    data
  })
}

export function addNews(data) {
  return request({
    url: '/news',
    method: 'post',
    data
  })
}



