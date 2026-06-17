---
title: Tailwind CSS の使い方入門
description: ユーティリティファーストの CSS フレームワーク Tailwind CSS の基本的な使い方と、よく使うクラスを解説します
upDate: 2025-02-17
pubDate: 2025-02-17
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - CSS
status: publish
---

## 回答

Tailwind CSS はユーティリティクラスを HTML に直接書くフレームワークです。

```html
<!-- ボタンコンポーネント -->
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  クリック
</button>

<!-- カードコンポーネント -->
<div class="bg-white shadow-md rounded-lg p-6 max-w-sm">
  <h2 class="text-xl font-semibold mb-2">タイトル</h2>
  <p class="text-gray-600 text-sm">説明テキスト</p>
</div>
```

## 解説

### レスポンシブ対応

プレフィックスにブレークポイントを付けてレスポンシブなスタイルを適用します。

```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- モバイル: 100%、タブレット: 50%、デスクトップ: 33% -->
</div>
```

### Flexbox と Grid

```html
<!-- Flexbox -->
<div class="flex items-center justify-between gap-4">
  ...
</div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-6">
  ...
</div>
```

### カスタム値

```html
<div class="w-[350px] text-[14px] bg-[#3b82f6]">
  任意の値を [ ] で指定できます
</div>
```

### @apply でクラスを再利用

```css
.btn {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
}
```
