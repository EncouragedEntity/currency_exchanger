import { AxiosRequestConfig, AxiosResponse } from 'axios';

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

interface ResponseData {
  success?: boolean;
  message?: string;
  [key: string]: any;
}

export type HttpResponse<T = ResponseData, D = any> = AxiosResponse<T, D>;

export type HttpConfig<D = any> = AxiosRequestConfig<D>;

export interface HttpError<T = any, D = any> {
  response?: AxiosResponse<T, D>;
  config?: HttpConfig<D>;
  isAxiosError?: boolean;
  status?: number;
  code?: string;
  request?: any;
}