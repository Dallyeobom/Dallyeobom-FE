import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('https://jayden-bin.cc/api/v1/auth/temporal/login', async ({ request }) => {
    return HttpResponse.json({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });
  }),
];
