---
title: px を vw に変換する計算式
description: デザインカンプのpx指定を、画面幅に応じて可変するvw単位に変換する計算式と、Sassのfunctionでの実装方法を解説します
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

`px` を `vw` に変換するには、以下の式で求める。

```plaintext
px ÷ 基準にするブラウザ幅（width） × 100
```

## 解説

### Sassのfunctionとして登録する

毎回手計算しなくて済むよう、Sass の function として登録しておくと呼び出すだけで変換できる。

```scss
@function px-vw($px, $std_width: 375) {
  @return #{$px / $std_width * 100}vw;
}

.text {
  font-size: px-vw(32px); // 基準幅375pxとして計算
}
```
