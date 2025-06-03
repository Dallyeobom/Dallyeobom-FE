import { API_BASE_URL } from '@/api/client';
import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.all('*', async () => {
    await delay(1000);
  }),
  http.post(`${API_BASE_URL}/api/v1/auth/temporal/login`, async () => {
    return HttpResponse.json({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });
  }),
  http.post(`${API_BASE_URL}/api/v1/auth/temporal/create`, async () => {
    return new HttpResponse(null, { status: 201 });
  }),
];
