import conf from '../conf/conf.js';
import axios from 'axios';

// Shared axios instance for all API calls
export const apiClient = axios.create({
    baseURL: conf.apiBaseUrl,
    withCredentials: true,
});

export default apiClient;
