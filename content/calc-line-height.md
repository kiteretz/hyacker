---
title: line-heightの比率はどう計算する？
description: フォントサイズと目標のline-height（px）から、CSSで指定する line-height の比率を求める計算方法を解説します
upDate: 2026-08-05
pubDate: 2026-08-05
author: とも
image:
  url: /assets/posts/card-thumbnail.svg
  alt: 画像の説明
tags:
  - CSS
status: publish
---

## 回答

`line-height` の比率は、以下の式で求める

```plaintext
line-heightのpx ÷ フォントサイズ
```

## 解説

### 具体例

`font-size: 24px;` に対して `line-height: 40px;` を指定したい場合、`40 ÷ 24 = 1.66666667` となる。

```css
.text {
  font-size: 24px;
  line-height: 1.66666667;
}
```

`line-height` は単位なしの数値で指定する。単位なしで指定すると、子要素に継承された際もそれぞれの `font-size` を基準に再計算されるため、`px` や `em` で指定するより扱いやすい。
