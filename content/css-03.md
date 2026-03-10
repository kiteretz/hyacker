---
title: CSS セレクタの種類と使い方
description: CSS セレクタの基本から、擬似クラス・擬似要素・結合子まで、セレクタの種類と優先度を解説します
upDate: 2025-01-17
pubDate: 2025-01-17
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - CSS
status: publish
---

## 回答

CSS セレクタは HTML 要素を特定するためのパターンです。基本的なセレクタには要素、クラス、ID があります。

```css
/* 要素セレクタ */
p { color: black; }

/* クラスセレクタ */
.card { border-radius: 8px; }

/* ID セレクタ */
#header { height: 64px; }

/* 属性セレクタ */
input[type="email"] { border: 1px solid blue; }

/* 子孫セレクタ */
.nav a { color: white; }

/* 直接の子要素 */
.list > li { list-style: none; }
```

## 解説

### 擬似クラス

特定の状態の要素を選択します。

```css
a:hover  { color: blue; }    /* マウスホバー時 */
a:focus  { outline: 2px solid; } /* フォーカス時 */
li:first-child { font-weight: bold; } /* 最初の子要素 */
li:nth-child(2n) { background: #f0f0f0; } /* 偶数番目 */
```

### 擬似要素

要素の一部や仮想的な要素にスタイルを適用します。

```css
p::first-line { font-weight: bold; } /* 最初の行 */
.card::before { content: "★"; }     /* 前に追加 */
.card::after  { content: "";  }      /* 後ろに追加 */
```

### 詳細度（Specificity）

セレクタには優先度があり、強い順に `!important` > ID > クラス > 要素 です。詳細度が高いスタイルが優先されます。
