import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Logger } from './logger';
import { HttpError, InternalError } from './errors';

export class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
    });
  }

  private handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      throw new HttpError(
        error.response?.status ?? 500,
        error.response?.statusText ?? 'Internal Error'
      );
    } else {
      const _error = error as Error;

      throw new InternalError(_error.message);
    }
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get<T>(url, config);
      return response.data;
    } catch (error) {
      Logger.debug(`Request to ${url} failed`);
      this.handleError(error);

      throw error;
    }
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      Logger.debug(`Request to ${url} failed`);
      throw error;
    }
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      Logger.debug(`Request to ${url} failed`);
      throw error;
    }
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.delete<T>(url, config);
      return response.data;
    } catch (error) {
      Logger.debug(`Request to ${url} failed`);
      throw error;
    }
  }
}

export const PreqinBackendHttpClient = new HttpClient(import.meta.env.VITE_BACKEND_URL);
