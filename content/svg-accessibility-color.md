---
title: インラインSVGをアクセシブルにするには？
description: インライン SVG を title・desc・role・aria-labelledby でアクセシブルにする方法を解説します
upDate: 2026-08-03
pubDate: 2026-08-03
author: とも
image:
  url: /assets/posts/2026/08/20260803-svg-accessibility-color-thumb.png
  alt:
tags:
  - HTML
status: publish
---

## 回答

インライン SVG をアクセシブルにするには `title` `desc` `role` `aria-labelledby` を活用する。  
`background-image` に配置した SVG でも、`fill` のカラーコードを URL エンコードすることで色を変更できる。

```html
<svg role="img" aria-labelledby="title desc">
  <title id="title">Image Title</title>
  <desc id="desc">Image description.</desc>
  <path />
</svg>
```

## 解説

### インライン SVG の場合

`title` と `desc` にそれぞれ `id` を付与し、その値を `aria-labelledby` プロパティに指定する。
