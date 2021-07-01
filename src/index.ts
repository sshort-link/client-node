import { ShortenOptions, SShortLink, SShortLinkConfig } from "./client";

const sshortLink = SShortLink.create();

export const init = (config: SShortLinkConfig = {}) => {
  sshortLink.updateConfig(config);
};

export const shorten = async (
  longURL: string,
  options: ShortenOptions = {}
): Promise<string> => {
  const res = await sshortLink.shorten(longURL, options);
  return res.link;
};

export * from "./client";
