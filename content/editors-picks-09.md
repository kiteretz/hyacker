---
title: JavaScript の Promise と async/await を理解する
description: Promise の仕組みから async/await の使い方まで、JavaScript の非同期処理を段階的に解説します
upDate: 2025-02-15
pubDate: 2025-02-15
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

`Promise` は非同期処理の結果を表すオブジェクトで、`async/await` はそれをより読みやすく書くための構文です。

```js
// Promise を使った書き方
function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.error(err));
}

// async/await を使った書き方（同じ処理）
async function fetchUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
```

## 解説

### Promise の3つの状態

1. `pending` : 処理中（初期状態）
2. `fulfilled` : 処理成功
3. `rejected` : 処理失敗

### 並列処理には Promise.all

```js
// 複数の非同期処理を並列で実行
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]);
```

### エラーハンドリング

`async` 関数では `try/catch` でエラーをキャッチします。`Promise` では `.catch()` を使います。どちらの方法でも、エラー処理を忘れると未処理のエラーが発生します。
