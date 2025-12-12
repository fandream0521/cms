import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface Interceptor {
  requestOnSuccess?: <T extends AxiosRequestConfig>(config: T) => T
  requestOnFailure?: <T>(error: T) => T
  responseOnSuccess?: <T = AxiosResponse, R = unknown>(response: T) => T | R
  responseOnFailure?: <T>(error: T) => T
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: Interceptor[]
}
