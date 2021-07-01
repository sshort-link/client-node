/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PostShortenPayload = {
  /**
   * an url that needs to be shorten
   */
  long_url: string;
  /**
   * custom domain used in the shorten url
   */
  domain?: string;
  /**
   * path of the short url
   */
  path?: string;
  /**
   * time to live, unixtime in second.
   * 1 year by default, maximum is 5 years.
   *
   */
  ttl?: number;
};
