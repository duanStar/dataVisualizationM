import axios from 'axios'

const service = axios.create({
  baseURL: 'https://book.youbaobao.xyz:18082',
  timeout: 5000
})

service.interceptors.response.use((response) => {
  if (response.status === 200 && response.data) {
    return response.data
  } else {
    return Promise.reject(new Error('请求失败'))
  }
}, err => {
  return Promise.reject(err)
})

export default service
