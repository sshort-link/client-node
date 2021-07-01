Node SShort Link Client
=======================

[![client-node](https://github.com/sshort-link/client-node/actions/workflows/main.yaml/badge.svg)](https://github.com/sshort-link/client-node/actions/workflows/main.yaml)

The Javascript clients for SShort Link is implemented in typescript.

## Installation

```bash
$ echo '@sshort-link:registry="https://npm.pkg.github.com"' > .npmrc
```

```bash
$ npm install @sshort-link/client-node
```

## Example Code

```typescript
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
```
