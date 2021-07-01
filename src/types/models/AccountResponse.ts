/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountTokenResponse } from "./AccountTokenResponse";

export type AccountResponse = {
  id: string;
  name: string;
  description: string;
  tokens: Array<AccountTokenResponse>;
  created_at: string;
  updated_at: string;
};
