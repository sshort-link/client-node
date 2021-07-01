import { HTTPClient, SShortLink } from "../../src/client";

describe("SShortLink", () => {
  test.each([
    [{}, {}],
    [
      { domain: "example.com", ttl: 600 },
      { domain: "example.com", ttl: 600 },
    ],
    [
      {
        domain: "example.com",
        ttl: 600,
        headers: { Authorization: "Bearer xxxxx" },
      },
      { domain: "example.com", ttl: 600 },
    ],
    [
      { ttl: 600, headers: { Authorization: "Bearer xxxxx" }, timeout: 3000 },
      { ttl: 600 },
    ],
  ])("create w/ %o", (config, expected) => {
    const sshortLink = SShortLink.create(config);
    expect(sshortLink.config).toEqual(expected);
  });

  test.each([
    [
      {},
      undefined,
      (data: any) => {
        expect(data).toEqual({ long_url: "https://example.com/long/long/url" });
      },
    ],
    [
      {},
      { ttl: 10000 },
      (data: any) => {
        expect(data).toEqual({
          long_url: "https://example.com/long/long/url",
          ttl: 10000,
        });
      },
    ],
    [
      { domain: "https://example.com", ttl: 3000 },
      { ttl: 10000 },
      (data: any) => {
        expect(data).toEqual({
          domain: "https://example.com",
          long_url: "https://example.com/long/long/url",
          ttl: 10000,
        });
      },
    ],
  ])(
    "shorten w/ config: %o, options: %o",
    async (config, options, assertData) => {
      const httpClient = HTTPClient.create();
      const mockPost = jest.spyOn(httpClient, "post");
      mockPost.mockImplementation((url: string, data: any) => {
        expect(url).toEqual("/shorten");
        assertData(data);
        return Promise.resolve({
          id: "wdqt8meq",
          link: "http://sshort.link/wdqt8meq",
          domain: "sshort.link",
          long_url: data.long_url,
          expires_at: "2019-08-24T14:15:22Z",
          created_at: "2019-08-24T14:15:22Z",
          updated_at: "2019-08-24T14:15:22Z",
        });
      });
      const sshortLink = new SShortLink({ config, httpClient });
      const res = await sshortLink.shorten(
        "https://example.com/long/long/url",
        options
      );
      expect(res).toEqual({
        id: "wdqt8meq",
        link: "http://sshort.link/wdqt8meq",
        domain: "sshort.link",
        long_url: "https://example.com/long/long/url",
        expires_at: "2019-08-24T14:15:22Z",
        created_at: "2019-08-24T14:15:22Z",
        updated_at: "2019-08-24T14:15:22Z",
      });
    }
  );
});
