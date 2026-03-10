---
title: CSS の z-index とスタッキングコンテキスト
description: z-index が効かない原因とスタッキングコンテキストの仕組みを理解し、レイヤー管理を正しく行う方法を解説します
upDate: 2025-02-12
pubDate: 2025-02-12
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - CSS
status: publish
---

## 回答

`z-index` は `position: static` 以外の要素（`relative`、`absolute`、`fixed`、`sticky`）に有効です。数値が大きいほど前面に表示されます。

```css
.modal-overlay {
  position: fixed;
  z-index: 100;
}

.modal {
  position: fixed;
  z-index: 101;
}

.tooltip {
  position: absolute;
  z-index: 200;
}
```

## 解説

### z-index が効かない理由

`z-index` を指定しても効かない場合、多くはスタッキングコンテキストの問題です。

### スタッキングコンテキストとは

特定の CSS プロパティを持つ要素はスタッキングコンテキストを形成し、その子要素の `z-index` はコンテキスト内でのみ有効になります。

**スタッキングコンテキストを作る主なプロパティ：**
- `position` が `relative/absolute/fixed/sticky` で `z-index` が `auto` 以外
- `opacity` が `1` 未満
- `transform` が `none` 以外
- `isolation: isolate`

### isolation プロパティ

新しいスタッキングコンテキストを明示的に作ります。

```css
.component {
  isolation: isolate; /* 子要素の z-index をこの範囲に限定 */
}
```

これにより、コンポーネント外の `z-index` に影響されない独立した重なり順が作れます。
