---
title: スマホでinputフォーカス時に自動ズームするのを防ぐには？
description: モバイルでのフォーカス時の自動ズームを防ぐため、input・textarea のフォントサイズを 16px 以上に設定する理由と方法を解説します
upDate: 2026-08-04
pubDate: 2026-08-04
author: とも
image:
  url: /assets/posts/2026/08/20260804-input-font-size-thumb.png
  alt:
tags:
  - CSS
  - HTML
status: publish
---

## 回答

`input`、`textarea` をデザイン・コーディングする際は、フォントサイズを `16px` 以上に設定する。

```css
input,
textarea {
  font-size: 16px;
}
```

## 解説

### なぜ 16px 以上にする必要があるのか

`16px` 未満のフォントサイズを `input` や `textarea` に設定すると、モバイル（主に iOS Safari）でフォーカスした際にページが自動的にズームしてしまう。 ユーザーが意図しない拡大表示になり、UX を損なう原因になる。

`16px` 以上を指定することで、この自動ズームを防げる。
