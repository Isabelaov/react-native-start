import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {BACKEND_URL} from '@env';
import {useAuth} from '../hooks';

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BACKEND_URL,
      timeout: 5000,
    });

    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await useAuth().getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      error => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await this.instance.get<T>(url, {params});
    return response.data;
  }

  async post<T>(url: string, data?: Record<string, any>): Promise<T> {
    const response = await this.instance.post<T>(url, data);
    return response.data;
  }

  async patch<T>(url: string, data?: Record<string, any>): Promise<T> {
    const response = await this.instance.patch<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.instance.delete<T>(url);
    return response.data;
  }
}

export const apiService = new ApiService();
