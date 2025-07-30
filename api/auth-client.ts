import axios from 'axios';
import { API_BASE_URL } from './base-url';

const authClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  adapter: 'fetch',
});

export default authClient;
