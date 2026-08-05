---
title: line-height の余白分を差し引いて margin・padding を逆算する方法
description: デザインカンプの余白の数値から、line-heightによって生まれる行間の余白を差し引き、実際に指定すべきmargin・paddingを求める計算方法を解説します
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

デザイン上の余白の数値から、`line-height` によって生まれる行間の余白を差し引いて、実際に指定すべき余白を求める式は以下の通り。

```css
(design_size - (((line_height - 1) * font_size) / 2)) / font_size
```

## 解説

### 計算の考え方

1. 現在の `line-height` の数値から `line-height: 1` との差分を出す（`line-height` によって増える余白の比率）
2. その比率に、その要素の `font-size` を掛けて、`line-height` が生んでいる余白の `px` を求める
3. 行数で割る（1行ならそのまま、さらに2で割ると1行あたりの上下それぞれの余白になる）
4. デザイン上の余白の数値から、その値を引くと、実際に指定すべき余白が `px` で出る
5. 最後にベースとなる `font-size`（`16px = 1em` の場合は `16`）で割って `em` に変換する

### 具体例

デザイン上の余白が `30px`、`line-height: 1.75`、`font-size: 16px` の場合。

```css
(30 - (((1.75 - 1) * 16) / 2)) / 16
```
