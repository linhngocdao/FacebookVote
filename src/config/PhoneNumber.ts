/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendDelete, sendGet, sendPost } from "./axios";

interface BaseParams {
  page?: number;
  limit?: number;
  isDuplicate?: boolean;
  query?: string;
}
interface PhonePayload {
  phoneNumbers: number[];
}


export const GetPhones = (params?: BaseParams) => sendGet('/phone', params);
export const SearchPhones = (params?: BaseParams) => sendGet('/phone', params);
export const AddPhone = (payload: PhonePayload) => sendPost('/phone', payload);
export const DeletePhone = (id: any) => sendDelete(`/phone/${id}`);
