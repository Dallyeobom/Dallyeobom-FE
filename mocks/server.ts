import { handlers } from '@/mocks/handlers';
import { setupServer } from 'msw/native';

export const server = setupServer(...handlers);
