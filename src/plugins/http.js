/**
 * 将axios.js封装成vue插件
 */

import axios from 'axios'
const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
  Vue.prototype.$http = axios
}

export default MyHttpServer
