import httpClient from '../api-interceptor/httpClient';

export const reviewList = async (type: string) => {
  try {
    const response = await httpClient.get('/v1/setting/review', {
      headers: { "Content-type": "application/json" },
      params: { type },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


