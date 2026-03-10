---
title: HTML フォームのアクセシビリティを高める方法
description: label タグや aria 属性を活用して、誰でも使いやすいフォームを実装する方法を解説します
upDate: 2025-02-10
pubDate: 2025-02-10
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - "Editor's Picks"
  - HTML
status: publish
---

## 回答

アクセシブルなフォームには `<label>` タグと `for` 属性を使い、各入力要素と関連付けます。

```html
<!-- label と input を関連付ける -->
<div>
  <label for="email">メールアドレス</label>
  <input
    type="email"
    id="email"
    name="email"
    required
    aria-describedby="email-hint"
  />
  <p id="email-hint">例: user@example.com</p>
</div>
```

## 解説

### label タグの重要性

`<label>` と `<input>` を関連付けることで、ラベルをクリックするだけで入力フォーカスが当たります。スクリーンリーダーもラベルのテキストを読み上げます。

### エラーメッセージのアクセシビリティ

```html
<input
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error" role="alert">
  メールアドレスの形式が正しくありません
</p>
```

### フォームの必須項目

- `required` 属性でバリデーションを行う
- `aria-required="true"` でスクリーンリーダーに伝える
- 視覚的にも必須であることを示す

1. `<label>` と `for` / `id` を必ず対応させる
2. エラーメッセージは `aria-describedby` で紐付ける
3. `required` 属性でブラウザのバリデーションを活用する
