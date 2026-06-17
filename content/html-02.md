---
title: セマンティック HTML を使うべき理由
description: div や span の代わりにセマンティックなタグを使うことのメリットと、主要なセマンティックタグの使い方を解説します
upDate: 2025-01-11
pubDate: 2025-01-11
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - HTML
status: publish
---

## 回答

`<div>` や `<span>` の代わりに、コンテンツの意味を表すタグ（`<header>`、`<nav>`、`<main>`、`<article>` など）を使うことをセマンティック HTML といいます。

```html
<header>
  <nav>
    <ul>
      <li><a href="/">ホーム</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>記事タイトル</h1>
    <p>本文...</p>
  </article>
  <aside>
    <p>サイドバー情報</p>
  </aside>
</main>

<footer>
  <p>&copy; 2025 サイト名</p>
</footer>
```

## 解説

### アクセシビリティ

スクリーンリーダーはセマンティックタグを読み取り、ページの構造をユーザーに伝えます。`<nav>` があればナビゲーション領域として認識されます。

### SEO

検索エンジンはタグの意味から各コンテンツの重要度を判断します。

### 主要なセマンティックタグ

- `<header>` : ヘッダー領域
- `<nav>` : ナビゲーション
- `<main>` : メインコンテンツ（1ページに1つ）
- `<article>` : 独立したコンテンツ
- `<section>` : テーマでまとまったセクション
- `<aside>` : 補足情報・サイドバー
- `<footer>` : フッター領域
