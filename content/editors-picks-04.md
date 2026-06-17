---
title: CSS アニメーションで動きのある UI を作る
description: CSS の transition と animation プロパティを使って、滑らかなアニメーション効果を実装する方法を解説します
upDate: 2025-01-20
pubDate: 2025-01-20
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - "Editor's Picks"
  - CSS
status: publish
---

## 回答

CSS でアニメーションを実装するには `transition` と `animation` の2つの方法があります。

```css
/* transition: 状態変化時のアニメーション */
.button {
  background-color: blue;
  transition: background-color 0.3s ease;
}
.button:hover {
  background-color: darkblue;
}

/* animation: keyframe を使った複雑なアニメーション */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.element {
  animation: fadeIn 0.5s ease forwards;
}
```

## 解説

### transition の使い方

`transition` はある状態から別の状態に変化するときのアニメーションを定義します。ホバー時の色変化やサイズ変更などに適しています。

### animation と @keyframes

`@keyframes` でアニメーションの途中経過を定義し、`animation` プロパティで要素に適用します。より複雑な動きを表現できます。

### パフォーマンスに配慮する

アニメーションは `transform` と `opacity` を使うと GPU が処理するためパフォーマンスが高くなります。`width` や `height`、`top`、`left` などは避けましょう。

1. `transform: translate()` で移動
2. `transform: scale()` で拡縮
3. `opacity` で透明度変化
