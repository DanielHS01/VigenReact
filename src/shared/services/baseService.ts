import Cookies from 'js-cookie';

//import {ApiResultModel} from '../models/ApiResultModel';

export async function baseService<TOut, TIn>(
  url: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
  object?: TIn,
): Promise<TOut> {
  let result: TOut;
  const token = Cookies.get('user-token');

  if (method === 'GET' || method === 'DELETE') {
    result = await executeWithParams<TOut, TIn>(url, method, object, token);
  } else {
    result = await executeWithBody<TOut, TIn>(url, method, object, token);
  }

  return result;
}

async function executeWithParams<TOut, TIn>(
  url: string,
  method: string,
  params?: TIn,
  token?: string,
): Promise<TOut> {
  if (params) url = url + '?' + new URLSearchParams(params).toString();
  const result = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  const data = await result.json();

  if (!result.ok) throw new Error(data.message);

  return data;
}

async function executeWithBody<TOut, TIn>(
  url: string,
  method: string,
  body?: TIn,
  token?: string,
): Promise<TOut> {
  const result = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  const data = await result.json();

  if (!result.ok) throw new Error(data.message);

  return data;
}