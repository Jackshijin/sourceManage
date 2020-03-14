/**
 * 将axios.js封装成vue插件
 */
import store from '../store/store'
import axios from 'axios'
axios.defaults.baseURL = '/graduateProject/sourceManageApi/api'
export const baseURL = axios.defaults.baseURL

axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.headers['Content-Type'] = 'application/json'
    config.headers['token'] = store.state.userInfo.token
    config.data = JSON.stringify(config.data)
    return config
  }
}, (error) => {
  return error
})

export function http (url, params, responseType) {
  return new Promise((resolve, reject) => {
    let userId = store.state.userInfo.id
    if (userId && userId > 0) {
      params.userId = parseInt(userId)
    } else {
      params.userId = 0
    }

    if (!responseType || typeof (responseType) === 'undefined') {
      // 普通post请求
      axios.post(url, params)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
    } else {
      // 导出下载文件
      axios.post(url, params, {
        responseType: responseType
      })
        .then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
    }
  })
}
