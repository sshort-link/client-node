import { ShortenOptions, SShortLink, SShortLinkConfig } from "./client";

const sshortLink = SShortLink.create();

type InitConfig = SShortLinkConfig & {
  accessToken?: string;
};

/**
 * The SShort Link Node SDK Client.
 *
 * To use this SDK, call the {@link init} function as early as possible in the
 * main entry module. To set context information or send manual events, use the
 * provided methods.
 *
 * @example
 * ```
 *
 * import { init } from '@sshort-link/client-node';
 *
 * init({
 *   accessTokne: '__ACCESS_TOKEN__',
 *   // ...
 * });
 * ```
 */
export const init = (config: InitConfig = {}) => {
  const headers: Record<string, string> = {};
  const accessToken =
    config.accessToken || process.env["SSHORT_LINK_ACCESS_TOKEN"];
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  sshortLink.updateConfig({
    ...config,
    headers: config.headers || headers,
  });
};

/**
 * Returns a shorten url.
 */
export const shorten = async (
  longURL: string,
  options: ShortenOptions = {}
): Promise<string> => {
  const res = await sshortLink.shorten(longURL, options);
  return res.link;
};

export * from "./client";
