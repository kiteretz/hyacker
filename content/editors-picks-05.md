---
title: JavaScript モジュールシステム（import/export）入門
description: ES Modules の import と export の基本的な書き方と、モジュール分割のメリットを解説します
upDate: 2025-01-25
pubDate: 2025-01-25
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - "Editor's Picks"
  - JavaScript
status: publish
---

## 回答

JavaScript のモジュールは `export` で値を公開し、`import` で読み込みます。

```js
// utils.js: 関数をエクスポート
export function add(a, b) {
  return a + b;
}

export const PI = 3.14159;

// default エクスポート
export default function greet(name) {
  return `Hello, ${name}!`;
}

// main.js: インポートして使用
import greet, { add, PI } from './utils.js';

console.log(add(1, 2));  // 3
console.log(PI);          // 3.14159
console.log(greet('世界')); // Hello, 世界!
```

## 解説

### named export と default export

`export` で名前付きエクスポートを、`export default` でデフォルトエクスポートを定義できます。1つのファイルに named export は複数定義できますが、default export は1つだけです。

### モジュール分割のメリット

- コードの再利用性が上がる
- 依存関係が明確になる
- テストしやすくなる
- バンドラーによるツリーシェイキングが可能

### import の書き方バリエーション

```js
// 名前を変えてインポート
import { add as sum } from './utils.js';

// すべてをオブジェクトとしてインポート
import * as utils from './utils.js';
utils.add(1, 2);
```
