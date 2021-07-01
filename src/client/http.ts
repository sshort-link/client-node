import axios, { AxiosInstance } from "axios";

export type HTTPClientOptions = {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
};

export class HTTPClient {
  instance: AxiosInstance;

  constructor({ instance }: { instance: AxiosInstance }) {
    this.instance = instance;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const res = await this.instance.post<T>(url, data);
    return res.data;
  }

  static create({
    baseURL,
    headers,
    timeout,
  }: HTTPClientOptions = {}): HTTPClient {
    const instance = axios.create({
      baseURL: baseURL || "https://sshort.link",
      timeout: timeout || 5000,
      headers: headers || {},
    });
    return new HTTPClient({ instance });
  }
}
