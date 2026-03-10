---
title: CSS の position プロパティを理解する
description: static・relative・absolute・fixed・sticky の違いと、それぞれの使いどころを解説します
upDate: 2025-01-22
pubDate: 2025-01-22
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - CSS
status: publish
---

## 回答

`position` プロパティには `static`、`relative`、`absolute`、`fixed`、`sticky` の5種類があります。

```css
/* relative: 通常の位置から相対的にずらす */
.badge {
  position: relative;
  top: -4px;
}

/* absolute: 最も近い position 指定の祖先要素を基準に配置 */
.parent {
  position: relative;
}
.tooltip {
  position: absolute;
  top: 100%;
  left: 0;
}

/* fixed: ビューポートを基準に固定 */
.header {
  position: fixed;
  top: 0;
  width: 100%;
}

/* sticky: スクロールに応じて fixed に切り替わる */
.nav {
  position: sticky;
  top: 0;
}
```

## 解説

### static（デフォルト）

通常のドキュメントフローに従って配置されます。`top`、`left` などのオフセット値は無効です。

### relative

通常の位置を基準にオフセットを指定できます。`absolute` の基準点を作るためにもよく使われます。

### absolute

通常のフローから外れ、`position: relative` などが指定された祖先要素を基準に配置されます。祖先にない場合は `body` が基準になります。

### fixed

ビューポート（画面）を基準に固定されます。スクロールしても位置が変わりません。

### sticky

通常のフローに従いつつ、スクロールで指定の位置に達すると `fixed` のように固定されます。
