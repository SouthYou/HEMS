import request from '@/utils/request'

export function uploadImage(data) {
  return request({
    url: '/news/image',
    method: 'post',
    data
  })
}

export function delImage(params) {
  return request({
    url: '/news/image',
    method: 'delete',
    params
  })
}

export function delImages(data) {
  return request({
    url: '/news/images',
    method: 'post',
    data
  })
}

export function getNews(params) {
  return request({
    url: '/news',
    method: 'get',
    params
  })
}

export function addNews(data) {
  return request({
    url: '/news',
    method: 'post',
    data
  })
}

export function updateNews(data) {
  return request({
    url: '/news',
    method: 'patch',
    data
  })
}

export function delNews(params) {
  return request({
    url: '/news',
    method: 'delete',
    params
  })
}
