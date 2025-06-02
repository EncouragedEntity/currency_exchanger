import axios, { AxiosError, AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import normalize from './normalize';
import type { HttpConfig, HttpError, HttpResponse } from './types';
import ENV from 'app/environments';
class Client {
  static instance: AxiosInstance = axios.create({
    timeout: 60000,
    baseURL: 'https://api.coinlayer.com/',
    validateStatus: (status: number) => status >= 200 && status < 300,
  });

  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

  constructor() {
    axiosRetry(Client.instance, { retries: 3, retryDelay: () => 1000 });

    this.interceptors.response.use(
  (result) => {
    const response = normalize.response(result);
    const { success, message = response.statusText } = response.data;

    if (success !== false) return Promise.resolve(response);

    return Promise.reject(new AxiosError(message));
  },
  (error: AxiosError) => {
    console.error('[Axios Error]', {
      message: error.message,
      code: error.code,
      isAxiosError: error.isAxiosError,
      config: error.config,
      response: error.response,
      request: error.request,
    });

    const response = normalize.response(error?.response);
    const { message } = response.data;

    return Promise.reject(new AxiosError(message));
  }
);

  }

  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

  url = Client.instance.defaults.baseURL;

  headers = Client.instance.defaults.headers;

  interceptors = Client.instance.interceptors;

  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

  path = (string: string) => (`${this.url}/${string}`).replace(/([^:]\/)\/+/g, '$1');

  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

  language = (locale: string) => this.headers.common.lang = locale;

  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

  authorization = (token?: string | null) => {
    if (!token) delete this.headers.common.Authorization;

    else this.headers.common.Authorization = `Bearer ${token}`;
  };

  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

  mock = <T>(data: T) => Promise.resolve({ data });

  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

  request = <T, R = HttpResponse<T>, D = any>(config: HttpConfig<D>) => {
    return Client.instance.request<T, R, D>(config);
  };

  get = <T, R = HttpResponse<T>, D = any>(url: string, config?: HttpConfig<D>) => {
    return Client.instance.get<T, R, D>(url, {...config, params: {...config?.params, access_key: ENV.url.key}});
  };

  delete = <T, R = HttpResponse<T>, D = any>(url: string, config?: HttpConfig<D>) => {
    return Client.instance.delete<T, R, D>(url, {...config, params: {...config?.params, access_key: ENV.url.key}});
  };

  head = <T, R = HttpResponse<T>, D = any>(url: string, config?: HttpConfig<D>) => {
    return Client.instance.head<T, R, D>(url, {...config, params: {...config?.params, access_key: ENV.url.key}});
  };

  options = <T, R = HttpResponse<T>, D = any>(url: string, config?: HttpConfig<D>) => {
    return Client.instance.options<T, R, D>(url, {...config, params: {...config?.params, access_key: ENV.url.key}});
  };

  post = <T, R = HttpResponse<T>, D = any>(url: string, data?: D, config?: HttpConfig<D>) => {
    return Client.instance.post<T, R, D>(url, data, {...config, params: {...config?.params, access_key: ENV.url.key}});
  };

  put = <T, R = HttpResponse<T>, D = any>(url: string, data?: D, config?: HttpConfig<D>) => {
    return Client.instance.put<T, R, D>(url, data, {...config, params: {...config?.params, access_key: ENV.url.key}});
  };

  patch = <T, R = HttpResponse<T>, D = any>(url: string, data?: D, config?: HttpConfig<D>) => {
    return Client.instance.patch<T, R, D>(url, data, {...config, params: {...config?.params, access_key: ENV.url.key}});
  };
}

export type { HttpResponse, HttpError };

export { Client };

export default new Client();