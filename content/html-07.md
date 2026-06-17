---
title: img タグのベストプラクティス
description: HTML の img タグを正しく使うための alt 属性、srcset、loading 属性などのベストプラクティスを解説します
upDate: 2025-02-05
pubDate: 2025-02-05
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - HTML
status: publish
---

## 回答

`<img>` タグには `alt`、`width`、`height` を必ず指定し、状況に応じて `loading` や `srcset` も使いましょう。

```html
<img
  src="photo.webp"
  alt="夕暮れの富士山の写真"
  width="800"
  height="600"
  loading="lazy"
/>
```

## 解説

### alt 属性

画像の内容をテキストで説明します。スクリーンリーダーが読み上げ、画像が表示できない場合にも代替テキストとして表示されます。

- 装飾目的の画像は `alt=""` （空文字）にする
- 内容のある画像は具体的に説明する

### width と height 属性

画像サイズを事前に指定することで、画像読み込み前にスペースが確保されレイアウトシフト（CLS）を防げます。

### loading="lazy"

スクロールして画像が表示領域に入ったときに読み込む遅延読み込みを有効にします。ファーストビュー外の画像に適用します。

### srcset でレスポンシブ画像

```html
<img
  src="image-800.jpg"
  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="画像の説明"
/>
```
