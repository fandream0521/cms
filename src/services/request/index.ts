import axios, { type AxiosInstance } from 'axios'
import type { BaseResponse, RequestConfig } from '../types'
import { ElMessage } from 'element-plus'

class MyRequest {
  #instance: AxiosInstance
  constructor(config: RequestConfig) {
    this.#instance = axios.create(config)

    this.#instance.interceptors.response.use(null, (error) => {
      return error.response
    })

    // 添加实例拦截器
    if (config.interceptors && config.interceptors.length > 0) {
      config.interceptors.forEach((interceptor) => {
        this.#instance.interceptors.request.use(
          interceptor.requestOnSuccess,
          interceptor.requestOnFailure,
        )
        this.#instance.interceptors.response.use(
          interceptor.responseOnSuccess,
          interceptor.responseOnFailure,
        )
      })
    }
  }

  request<T>(config: RequestConfig) {
    return new Promise<T>((resolve, reject) => {
      this.#instance
        .request<BaseResponse<T>>(config)
        .then((response) => {
          const res = response.data

          if (res.code !== 200) {
            throw new Error(res.message)
          }

          resolve(res.data)
        })
        .catch((error) => {
          console.log('请求出错:', error)
          ElMessage.error(error.message || '请求失败')
          reject(error)
        })
    })
  }

  get<T>(url: string, config?: RequestConfig) {
    return this.request<T>({
      ...config,
      url,
      method: 'GET',
    })
  }

  post<T>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>({
      ...config,
      url,
      data,
      method: 'POST',
    })
  }

  delete(url: string, config?: RequestConfig) {
    return this.request({
      ...config,
      url,
      method: 'DELETE',
    })
  }
}

export default MyRequest
