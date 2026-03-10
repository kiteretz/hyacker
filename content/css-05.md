---
title: メディアクエリでレスポンシブデザインを実現する
description: CSS のメディアクエリの書き方と、ブレークポイントの設定方法、モバイルファーストの考え方を解説します
upDate: 2025-01-27
pubDate: 2025-01-27
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - CSS
status: publish
---

## 回答

`@media` ルールを使って画面幅に応じたスタイルを定義します。

```css
/* モバイルファースト: まず小さい画面のスタイル */
.card {
  width: 100%;
  padding: 16px;
}

/* 768px 以上（タブレット） */
@media (min-width: 768px) {
  .card {
    width: 50%;
    padding: 24px;
  }
}

/* 1024px 以上（デスクトップ） */
@media (min-width: 1024px) {
  .card {
    width: 33.33%;
  }
}
```

## 解説

### ブレークポイントの決め方

デバイスのサイズではなく、デザインが崩れ始めるポイントをブレークポイントにします。一般的な目安は以下の通りです。

- `640px` : スマートフォン（横向き）
- `768px` : タブレット
- `1024px` : ラップトップ
- `1280px` : デスクトップ

### ダークモード対応

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: #171717;
    color: #ffffff;
  }
}
```

### 印刷スタイル

```css
@media print {
  .nav, .footer { display: none; }
  body { font-size: 12pt; }
}
```

### pointer と hover

タッチデバイスかどうかを判定できます。

```css
@media (hover: hover) {
  .button:hover { background-color: darkblue; }
}
```
