import { BASE_URL, TIMEOUT } from './config';
import MyRequest from './request';

const request = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: [
    {
      requestOnSuccess(config) {
        console.log('实例请求成功拦截器');
        return config;
      },
      responseOnSuccess(response) {
        console.log('实例响应成功拦截器, response:', response);
        return response;
      },
    },
  ],
});

export { request };
