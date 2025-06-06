import { server } from './mocks/server';
import './msw.polyfills';

beforeAll(async () => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
