---
title: JavaScript の非同期処理をマスターする
description: コールバック、Promise、async/await まで JavaScript の非同期処理の全体像を理解します
upDate: 2025-01-10
pubDate: 2025-01-10
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

JavaScript の非同期処理は `Promise` または `async/await` で扱います。

```js
// async/await を使った非同期処理
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('エラー:', error);
  }
}
```

## 解説

### コールバック（旧来の方法）

非同期処理の結果を関数の引数として受け取る方法です。ネストが深くなると「コールバック地獄」になりやすい問題があります。

### Promise

コールバック地獄を解消するために登場した仕組みです。`.then()` と `.catch()` でチェーンして書けます。

### async/await

Promise をより読みやすく書けるシンタックスシュガーです。同期処理のように見える直感的なコードが書けます。

1. `async` キーワードを関数に付ける
2. 非同期処理の前に `await` を付ける
3. エラー処理は `try/catch` で行う
