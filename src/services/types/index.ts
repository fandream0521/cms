import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface Interceptor {
  requestOnSuccess?: <T extends AxiosRequestConfig>(config: T) => T
  requestOnFailure?: <T>(error: T) => T
  responseOnSuccess?: <T>(response: AxiosResponse<T>) => AxiosResponse<T>
  responseOnFailure?: <T>(error: T) => T
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: Interceptor[]
}

export interface BaseResponse<T> {
  code: number
  message: string
  data: T
}
