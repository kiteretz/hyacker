---
title: CSS Flexbox の完全ガイド
description: CSS Flexbox の基本的なプロパティから実用的なレイアウトパターンまでを網羅的に解説します
upDate: 2025-01-07
pubDate: 2025-01-07
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - CSS
status: publish
---

## 回答

Flexbox は `display: flex` を親要素に指定することで有効になります。

```css
.container {
  display: flex;
  justify-content: center;   /* 主軸方向の配置 */
  align-items: center;       /* 交差軸方向の配置 */
  gap: 16px;                 /* アイテム間の余白 */
  flex-wrap: wrap;           /* 折り返しを許可 */
}

.item {
  flex: 1;  /* 残りのスペースを均等に分配 */
}
```

## 解説

### justify-content の主な値

- `flex-start` : 先頭に揃える
- `flex-end` : 末尾に揃える
- `center` : 中央に揃える
- `space-between` : 両端に配置し均等分配
- `space-around` : 均等な余白で分配

### align-items の主な値

- `stretch` : 交差軸方向に引き伸ばす（デフォルト）
- `flex-start` : 先頭に揃える
- `center` : 中央に揃える
- `flex-end` : 末尾に揃える

### flex-direction

```css
/* 縦方向に並べる */
.container {
  flex-direction: column;
}
```

### よくある使い方

1. 要素を中央揃えにする
2. ナビゲーションを横並びにする
3. カードを均等に並べる
