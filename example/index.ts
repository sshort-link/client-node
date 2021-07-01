import { init, shorten } from '@sshort-link/client-node'

const accessToken = process.env['ACCESS_TOKEN'] || '';

init({ headers: { Authorization: `Bearer ${accessToken}` } });

(async () => {
  const randomShortURL = await shorten("https://example.com/long/long/long/url");
  console.log(randomShortURL)

  const defintiveShortURL = await shorten("https://example.com/long/long/long/url", {
    path: `my-custom-${Date.now()}`
  });
  console.log(defintiveShortURL)
})();
