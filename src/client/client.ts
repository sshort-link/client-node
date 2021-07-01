import { HTTPClient, HTTPClientOptions } from "./http";
import { PostShortenPayload, ShortenResponse } from "../types";

export type SShortLinkConfig = Partial<
  Omit<PostShortenPayload, "long_url" | "path">
> &
  HTTPClientOptions;

export type ShortenOptions = Omit<PostShortenPayload, "long_url" | "ttl"> & {
  ttl?: number;
};

export class SShortLink {
  config: SShortLinkConfig;
  httpClient: HTTPClient;

  constructor({
    config,
    httpClient,
  }: {
    config?: SShortLinkConfig;
    httpClient: HTTPClient;
  }) {
    this.config = config || {};
    this.httpClient = httpClient;
  }

  updateConfig({ baseURL, domain, headers, timeout, ttl }: SShortLinkConfig) {
    this.config = { domain, ttl };
    this.httpClient = HTTPClient.create({ baseURL, headers, timeout });
  }

  async shorten(
    longURL: string,
    options: ShortenOptions = {}
  ): Promise<ShortenResponse> {
    const data: PostShortenPayload = {
      long_url: longURL,
      ttl: options.ttl || this.config.ttl,
      domain: options.domain || this.config.domain,
      path: options.path,
    };
    return this.httpClient.post<ShortenResponse>("/shorten", data);
  }

  static create({
    baseURL,
    domain,
    headers,
    timeout,
    ttl,
  }: SShortLinkConfig = {}): SShortLink {
    return new SShortLink({
      config: { domain, ttl },
      httpClient: HTTPClient.create({ baseURL, headers, timeout }),
    });
  }
}
