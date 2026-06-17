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
