import type { HttpResponse } from './types';

const response = (object?: HttpResponse<any, any>): HttpResponse => {
  const result = <HttpResponse>{ data: {} };

  if (object) Object.assign(result, object);

  // Normalize missing data
  if (result.data == null) result.data = {
    success: result.status === 200,
    message: result.statusText,
  };

  // Normalize wrong data
  if (typeof result.data === 'string') result.data = {
    message: result.data || result.statusText,
    success: result.status === 200,
  };

  // Normalize error data
  if (result.data.error) result.data = {
    message: result.data.error?.message ?? result.data.error,
    success: result.status === 200,
    ...result.data,
  };

  return result;
};

export default { response };