import useLoginStore from '@/stores/login'
import { BASE_URL, TIMEOUT } from './config'
import MyRequest from './request'

const request = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: [
    {
      requestOnSuccess: (config) => {
        const { token } = useLoginStore()
        if (token && config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
    },
  ],
})

export { request }
