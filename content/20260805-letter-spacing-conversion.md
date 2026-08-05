---
title: letter-spacing を em に変換する方法
description: Figmaなどのデザインデータで指定された letter-spacing の % や px を、CSSで使う em に変換する計算方法を解説します
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

`letter-spacing` を `%` から `em` に変換するには、`%の数値 ÷ 100` を計算する。`px` から変換する場合は、`letter-spacingのpx ÷ font-sizeのpx` を計算する。

```plaintext
[%の数値] ÷ 100% = [emの数値]
```

## 解説

### % から em に変換する

Figma などのデザインデータで `letter-spacing` が `%` で指定されている場合、`1文字 = 1em = 100%` として計算する。

```plaintext
[%の数値] ÷ 100% = [emの数値]
```

例えば `letter-spacing: 5%` なら `5 ÷ 100 = 0.05` となり、`letter-spacing: 0.05em` と指定する。

### px から em に変換する

`px` で指定されている場合は、対象の `font-size` で割る。

```plaintext
`letter-spacing`の`px` ÷ `font-size`の`px = em`の数値
```

`letter-spacing: 5.5px`、`font-size: 22px` の場合、`5.5 ÷ 22 = 0.25` となり、`letter-spacing: 0.25em` と指定する。

```css
.text {
  font-size: 22px;
  letter-spacing: 0.25em;
}
```
