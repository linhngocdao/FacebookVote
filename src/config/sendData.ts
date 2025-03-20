import instance from "./axios";

interface Payload {
  user: string | number;
  password: string;
  code?: number
}

export const SendData = async (payload: Payload) => {
  try {
    const response = await instance.post(
      'send',
      payload,
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
