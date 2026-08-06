---
title: clamp()の推奨値はどう計算する？
description: clamp(最小値, 推奨値, 最大値) の推奨値を、最小値を固定したい画面幅から逆算する計算方法を解説します
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

`clamp(最小値, 推奨値, 最大値)` の推奨値は、以下の式で求める。

```plaintext
最小のフォントサイズ ÷ 最小のフォントサイズで止める画面幅 × 100 = vwの値
```

## 解説

### 具体例

`768px` で最小値の `14px` に固定したい、最大値を `16px` にしたい場合。

```plaintext
14px ÷ 768px × 100 = 1.8229166667vw
```

したがって、以下のように指定する。

```css
.text {
  font-size: clamp(14px, 1.8229166667vw, 16px);
}
```

画面幅が `768px` 以下になると `14px` で固定され、それより広い画面では `16px` を上限に `vw` に応じて滑らかにサイズが変化する。
