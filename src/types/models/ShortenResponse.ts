/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ShortenResponse = {
  id: string;
  /**
   * a shorten url
   */
  link: string;
  /**
   * custom domain used in the shorten url
   */
  domain: string;
  /**
   * the original long url
   */
  long_url: string;
  /**
   * datetime when link expires
   */
  expires_at: string;
  created_at: string;
  updated_at: string;
};
