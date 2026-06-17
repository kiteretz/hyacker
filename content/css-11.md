---
title: CSS の擬似クラスと擬似要素を使いこなす
description: :hover や :nth-child などの擬似クラスと、::before・::after などの擬似要素の使い方と実践的な活用例を解説します
upDate: 2025-02-27
pubDate: 2025-02-27
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - CSS
status: publish
---

## 回答

擬似クラス（`:`）は要素の状態を、擬似要素（`::`）は要素の特定部分を選択します。

```css
/* 擬似クラス */
a:hover  { color: blue; }
input:focus { outline: 2px solid blue; }
input:invalid { border-color: red; }
li:first-child { font-weight: bold; }
li:last-child  { border-bottom: none; }
li:nth-child(odd)  { background: #f5f5f5; } /* 奇数行 */
li:nth-child(even) { background: white; }    /* 偶数行 */

/* 擬似要素 */
p::first-line { font-size: 1.2em; }
blockquote::before { content: '"'; }
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

## 解説

### :is() と :where()

複数のセレクタをまとめて書けます。

```css
/* 従来の書き方 */
h1 a, h2 a, h3 a { color: blue; }

/* :is() を使った書き方 */
:is(h1, h2, h3) a { color: blue; }
```

### :not() で特定の要素を除外

```css
/* 最後の要素以外に border-bottom を付ける */
li:not(:last-child) {
  border-bottom: 1px solid #eee;
}
```

### ::before と ::after

`content` プロパティと組み合わせて装飾や機能を追加できます。

```css
.required::after {
  content: " *";
  color: red;
}

.external-link::after {
  content: " ↗";
  font-size: 0.8em;
}
```
