---
title: Cloudflare Pages にベーシック認証をかけるには？
description: Cloudflare Pages にデプロイしているウェブサイトにベーシック認証をかける方法を解説
upDate: 2026-08-06
pubDate: 2026-08-06
author: Shogo
image:
  url: /assets/posts/card-thumbnail.svg
  alt: 画像の説明
tags:
  - Cloudflare
status: publish
---

## 回答

Cloudflare Pages にベーシック認証をかけるためには、次の2つのファイルを作成し、環境変数を設定する必要がある。

- `functions/_middleware.js`
- `wrangler.json`

## 解説

### `functions/_middleware.js`

このファイルはミドルウェアの処理を記述するためのもの。

```js
/**
 * Shows how to restrict access using the HTTP Basic schema.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
 * @see https://tools.ietf.org/html/rfc7617
 *
 */

import { Buffer } from 'node:buffer';

const encoder = new TextEncoder();

/**
 * Protect against timing attacks by safely comparing values using `timingSafeEqual`.
 * Refer to https://developers.cloudflare.com/workers/runtime-apis/web-crypto/#timingsafeequal for more details
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
function timingSafeEqual(a, b) {
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);

  if (aBytes.byteLength !== bBytes.byteLength) {
    // Strings must be the same length in order to compare
    // with crypto.subtle.timingSafeEqual
    return false;
  }

  return crypto.subtle.timingSafeEqual(aBytes, bBytes);
}

export async function onRequest({ request, next, env }) {
  const BASIC_AUTH = env.BASIC_AUTH;

  // The "Authorization" header is sent when authenticated.
  const authorization = request.headers.get('Authorization');
  if (!authorization) {
    return new Response('You need to login.', {
      status: 401,
      headers: {
        // Prompts the user for credentials.
        'WWW-Authenticate': 'Basic realm="my scope", charset="UTF-8"',
      },
    });
  }
  const [scheme, encoded] = authorization.split(' ');

  // The Authorization header must start with Basic, followed by a space.
  if (!encoded || scheme !== 'Basic') {
    return new Response('Malformed authorization header.', {
      status: 400,
    });
  }

  const credentials = Buffer.from(encoded, 'base64').toString();

  if (!timingSafeEqual(BASIC_AUTH, credentials)) {
    return new Response('You need to login.', {
      status: 401,
      headers: {
        // Prompts the user for credentials.
        'WWW-Authenticate': 'Basic realm="my scope", charset="UTF-8"',
      },
    });
  }

  return await next();
}
```

### `wrangler.json`

Cloudflare のランタイムで Node.js の組み込みモジュールを使えるようにするためのもの。

```json
{
  "name": "hyacker",
  "pages_build_output_dir": "dist",
  "compatibility_flags": ["nodejs_compat"],
  "compatibility_date": "2024-09-23",
  "vars": {
    "NODE_VERSION": "24"
  }
}
```

ここでは、 `compatibility_date` が `2024-09-23` 以降なら`nodejs_compat_v2` が有効になるためその日をセットしている。

ついでに `NODE_VERSION` 環境変数を追加し、使用する Node.js のバージョンの指定も行っている。

### 環境変数の設定

環境変数は Cloudflare の管理画面より行う。

該当の Cloudflare Pages プロジェクトの “Settings > Variables and secrets” より行う。

内容は次のようにする。

- Name: `BASIC_AUTH`
- Value: `NAME:PASSWORD` ← プロジェクトごとに要変更

## 参考

- [Middleware · Cloudflare Pages docs](https://developers.cloudflare.com/pages/functions/middleware/)
- [Compatibility flags · Cloudflare Workers docs](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag)
- [Environment variables · Cloudflare Workers docs](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-the-dashboard)
