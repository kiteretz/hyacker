---
title: HTML5 の新しいフォーム要素と type 属性
description: HTML5 で追加されたフォームの type 属性と便利な入力要素について解説します
upDate: 2025-01-16
pubDate: 2025-01-16
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - HTML
status: publish
---

## 回答

HTML5 では `<input>` の `type` 属性に多くの種類が追加され、ブラウザのバリデーションやスマートフォンの入力キーボードを最適化できます。

```html
<!-- メールアドレス入力 -->
<input type="email" placeholder="user@example.com" />

<!-- 電話番号入力 -->
<input type="tel" placeholder="090-1234-5678" />

<!-- 数値入力 -->
<input type="number" min="0" max="100" step="1" />

<!-- 日付選択 -->
<input type="date" />

<!-- カラーピッカー -->
<input type="color" value="#3b82f6" />

<!-- 範囲スライダー -->
<input type="range" min="0" max="100" value="50" />
```

## 解説

### type="email"

メールアドレス形式のバリデーションが自動で行われます。スマートフォンでは `@` を含むキーボードが表示されます。

### type="number"

`min`、`max`、`step` 属性で入力範囲を制限できます。数値以外の入力を防ぎます。

### type="date"

ブラウザ標準の日付ピッカーが表示されます。値は `YYYY-MM-DD` 形式で取得できます。

### datalist を使ったサジェスト

```html
<input list="languages" placeholder="言語を選択" />
<datalist id="languages">
  <option value="HTML">
  <option value="CSS">
  <option value="JavaScript">
</datalist>
```
