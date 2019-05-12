import axios from 'axios'
const myServer = {}
myServer.install = Vue => {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  const token = window.localStorage.getItem('token')
  axios.defaults.headers.common['Authorization'] = token
  Vue.prototype.$http = axios
}

export default myServer
