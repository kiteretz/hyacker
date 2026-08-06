---
title: background-imageに配置したSVGの色を変更するには？
description: background-image に配置した SVG の fill カラーコードを URL エンコードして色を変更する方法を解説します
upDate: 2026-08-03
pubDate: 2026-08-03
author: とも
image:
  url: /assets/posts/card-thumbnail.svg
  alt: 画像の説明
tags:
  - CSS
status: publish
---

## 回答

`background-image` に配置した SVG でも、`fill` のカラーコードを URL エンコードすることで色を変更できる。

```css
background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="%23888888" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"/></svg>');
```

## 解説

### background-image に配置した際に色も変更できるようにする

`path` に指定のある `fill` にカラーコードを入れると、望む色に変更できる。
`fill="%23` の後ろについている `888888` の部分がカラーコード。
