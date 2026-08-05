---
title: Tailwind CSS の使い方入門
description: ユーティリティファーストの CSS フレームワーク Tailwind CSS の基本的な使い方と、よく使うクラスを解説します
upDate: 2025-02-17
pubDate: 2025-02-17
author: とも
image:
  url: /assets/posts/card-thumbnail.svg
  alt: 背景の画像
tags:
  - CSS
status: draft
---

## 回答

Tailwind CSS はユーティリティクラスを HTML に直接書くフレームワークです。

```html
<!-- ボタンコンポーネント -->
<button class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">クリック</button>

<!-- カードコンポーネント -->
<div class="max-w-sm rounded-lg bg-white p-6 shadow-md">
  <h2 class="mb-2 text-xl font-semibold">タイトル</h2>
  <p class="text-sm text-gray-600">説明テキスト</p>
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
<div class="flex items-center justify-between gap-4">...</div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-6">...</div>
```

### カスタム値

```html
<div class="w-[350px] bg-[#3b82f6] text-[14px]">任意の値を [ ] で指定できます</div>
```

### @apply でクラスを再利用

```css
.btn {
  @apply rounded bg-blue-500 px-4 py-2 font-bold text-white;
}
```
