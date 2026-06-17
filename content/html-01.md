---
title: HTML の基本構造を理解する
description: HTML ドキュメントの基本的な構造と、各タグの役割について解説します
upDate: 2025-01-06
pubDate: 2025-01-06
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - HTML
status: publish
---

## 回答

HTML ドキュメントの基本構造は以下のとおりです。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ページタイトル</title>
  </head>
  <body>
    <h1>見出し</h1>
    <p>本文テキスト</p>
  </body>
</html>
```

## 解説

### DOCTYPE 宣言

`<!DOCTYPE html>` は HTML5 であることをブラウザに伝える宣言です。省略するとブラウザが後方互換モード（Quirks Mode）で動作し、意図しない表示になる場合があります。

### head 要素

ページに関するメタデータを格納します。ブラウザに表示されない情報（文字コード、タイトル、CSS の読み込みなど）を記述します。

### body 要素

実際にブラウザに表示されるコンテンツを記述します。テキスト、画像、リンクなどすべての表示要素はここに書きます。

- `charset="UTF-8"` : 文字コードの指定
- `viewport` メタタグ : モバイル表示の最適化
- `title` : タブやブックマークに表示されるタイトル
