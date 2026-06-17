---
title: CSS トランジションとアニメーションの使い方
description: CSS の transition プロパティと @keyframes アニメーションの基本的な書き方と、パフォーマンスを考慮した実装方法を解説します
upDate: 2025-02-01
pubDate: 2025-02-01
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - CSS
status: publish
---

## 回答

`transition` で状態変化のアニメーションを、`@keyframes` で複雑なアニメーションを実装します。

```css
/* transition: プロパティ 時間 イージング */
.button {
  background-color: #3b82f6;
  transform: scale(1);
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.button:hover {
  background-color: #1d4ed8;
  transform: scale(1.05);
}

/* @keyframes アニメーション */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.modal {
  animation: slideIn 0.3s ease forwards;
}
```

## 解説

### イージング関数

アニメーションの速度変化を指定します。

- `ease` : ゆっくり始まり、ゆっくり終わる（デフォルト）
- `linear` : 一定速度
- `ease-in` : ゆっくり始まる
- `ease-out` : ゆっくり終わる
- `cubic-bezier(x1, y1, x2, y2)` : カスタムイージング

### animation プロパティの値

```css
animation: 名前 時間 イージング 遅延 繰り返し回数 方向 フィルモード;
animation: fadeIn 0.5s ease 0.2s 1 normal forwards;
```

### パフォーマンス

`transform` と `opacity` のアニメーションは GPU で処理されパフォーマンスが良いです。`width`、`height`、`top` などはレイアウト再計算が発生するため避けましょう。
