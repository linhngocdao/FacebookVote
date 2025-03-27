/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:8888/api',
  timeout: 3 * 60 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendGet = async <T>(url: string, params?: any): Promise<T> => {
  const res = await instance.get(url, { params });
  return res.data as T;
};

export const sendPost = <T>(
  url: string,
  params?: unknown,
  queryParams?: Record<string, unknown>
): Promise<T> =>
  instance
    .post(url, params, { params: queryParams })
    .then((res) => res.data as T);

export const sendPut = <T>(url: string, params?: unknown): Promise<T> =>
  instance.put(url, params).then((res) => res.data as T);

export const sendPatch = <T>(url: string, params?: unknown): Promise<T> =>
  instance.patch(url, params).then((res) => res.data as T);

export const sendDelete = <T>(
  url: string,
  params?: Record<string, unknown>
): Promise<T> =>
  instance.delete(url, { params }).then((res) => res.data as T);

export default instance;
