import type { AxiosRequestConfig, AxiosResponse } from 'axios';

interface Interceptor {
  requestOnSuccess?: <T extends AxiosRequestConfig>(config: T) => T;
  requestOnFailure?: (error: unknown) => unknown;
  responseOnSuccess?: <T = AxiosResponse, R = unknown>(response: T) => T | R;
  responseOnFailure?: (error: unknown) => unknown;
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: Interceptor[];
}
