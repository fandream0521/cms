import axios, { type AxiosInstance } from 'axios'
import type { RequestConfig } from '../types'

class MyRequest {
  #instance: AxiosInstance
  constructor(config: RequestConfig) {
    this.#instance = axios.create(config)

    // 添加全局拦截器
    this.#instance.interceptors.request.use(
      (config) => {
        console.log('全局请求成功拦截器')
        return config
      },
      (error) => {
        console.log('全局请求失败拦截器')
        return error
      },
    )

    this.#instance.interceptors.response.use(
      (response) => {
        console.log('全局响应成功拦截器, response:', response)
        return response.data
      },
      (error) => {
        console.log('全局响应失败拦截器, error:', error)
        return error
      },
    )

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

  request<T = unknown>(config: RequestConfig) {
    // 添加请求拦截器
    if (config.interceptors && config.interceptors.length > 0) {
      config.interceptors.forEach((interceptor) => {
        try {
          if (interceptor.requestOnSuccess) {
            config = interceptor.requestOnSuccess(config)
          }
        } catch (err) {
          if (interceptor.requestOnFailure) {
            err = interceptor.requestOnFailure(err)
          }
          throw err
        }
      })
    }
    return new Promise<T>((resolve, reject) => {
      this.#instance
        .request<unknown, T>(config)
        .then((response) => {
          if (config.interceptors && config.interceptors.length > 0) {
            config.interceptors.forEach((interceptor) => {
              if (interceptor.responseOnSuccess) {
                response = interceptor.responseOnSuccess(response)
              }
            })
          }
          resolve(response)
        })
        .catch((error) => {
          if (config.interceptors && config.interceptors.length > 0) {
            config.interceptors.forEach((interceptor) => {
              if (interceptor.responseOnFailure) {
                error = interceptor.responseOnFailure(error)
              }
            })
          }
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

  post<T>(url: string, data: unknown, config?: RequestConfig) {
    return this.request<T>({
      ...config,
      url,
      data,
      method: 'POST',
    })
  }
}

export default MyRequest
