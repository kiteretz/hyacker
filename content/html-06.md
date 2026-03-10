---
title: リンクと a タグの使い方
description: HTML のアンカータグを使ったリンクの作り方と、target 属性や rel 属性の正しい使い方を解説します
upDate: 2025-01-31
pubDate: 2025-01-31
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - HTML
status: publish
---

## 回答

`<a>` タグに `href` 属性でリンク先 URL を指定してリンクを作成します。

```html
<!-- 外部リンク -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  外部サイトへのリンク
</a>

<!-- 内部リンク -->
<a href="/about">About ページ</a>

<!-- ページ内リンク -->
<a href="#section1">セクション1に移動</a>
<section id="section1">...</section>

<!-- メールリンク -->
<a href="mailto:info@example.com">メールを送る</a>

<!-- 電話リンク -->
<a href="tel:0312345678">03-1234-5678</a>
```

## 解説

### target="_blank" と rel 属性

外部リンクを新しいタブで開く場合は `target="_blank"` を使います。セキュリティのために `rel="noopener noreferrer"` を必ず一緒に指定します。

### ダウンロードリンク

```html
<a href="/files/document.pdf" download="資料.pdf">PDF をダウンロード</a>
```

### アクセシビリティ

- リンクテキストは「こちら」ではなく、遷移先の内容が分かる具体的な言葉にする
- アイコンのみのリンクには `aria-label` を付ける

```html
<!-- 良い例 -->
<a href="/contact">お問い合わせページへ</a>

<!-- 悪い例 -->
<a href="/contact">こちら</a>
```
