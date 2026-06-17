---
title: HTML のメタタグと SEO の関係
description: head 要素の中に記述するメタタグの種類と、SEO やソーシャルシェアに影響するタグの使い方を解説します
upDate: 2025-01-26
pubDate: 2025-01-26
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - HTML
status: publish
---

## 回答

SEO に関わる主要なメタタグは `description`、OGP タグ、canonical タグです。

```html
<head>
  <meta charset="UTF-8" />
  <title>ページタイトル | サイト名</title>
  <meta name="description" content="ページの概要を150文字程度で記述します" />

  <!-- OGP タグ（SNS シェア用） -->
  <meta property="og:title" content="ページタイトル" />
  <meta property="og:description" content="ページの概要" />
  <meta property="og:image" content="https://example.com/ogp.jpg" />
  <meta property="og:url" content="https://example.com/page" />
  <meta property="og:type" content="article" />

  <!-- canonical URL（重複コンテンツ対策） -->
  <link rel="canonical" href="https://example.com/page" />
</head>
```

## 解説

### title タグ

検索結果やブラウザのタブに表示されます。32文字程度で簡潔に、かつキーワードを含めて記述します。

### meta description

検索結果のスニペット（説明文）として表示されます。120〜150文字程度が適切です。

### OGP（Open Graph Protocol）

Facebook や X（旧 Twitter）などの SNS でシェアされたときに表示されるタイトル・画像・説明文を設定します。

### robots メタタグ

```html
<!-- インデックスを拒否する場合 -->
<meta name="robots" content="noindex, nofollow" />
```
