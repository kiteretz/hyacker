---
title: VS Codeでよく使うコードを登録して使い回すには？
description: VS Code のユーザースニペット機能を使い、よく使うコードを短いキーワードで呼び出せるように登録する方法を解説します
upDate: 2026-08-19
pubDate: 2026-08-19
author: とも
image:
  url: /assets/posts/card-thumbnail.svg
  alt: 画像の説明
tags:
  - Tools
status: publish
---

## 回答

`Code → Preferences → User Snippets` から対象の言語ファイル（例: `scss.json`）を選び、`prefix` と `body` を登録すると、`prefix` に指定した文字列を入力するだけでコードを展開できる。

```json
{
  "Media query for PC": {
    "prefix": "@pc",
    "body": ["@media screen and (min-width: 768px) {", "  $1", "}"],
    "description": "PC用のメディアクエリを挿入"
  }
}
```

## 解説

### ユーザースニペットとは

よく使うコードを登録できる、ユーザー辞書のようなもの。`prefix` に登録した文字列を入力すると、`body` に書いたコードに変換される。

### 登録方法

1. `Code → Preferences → User Snippets` を開く
2. 登録したい言語のファイル（例: SCSS なら `scss.json`）を選択する
3. ファイル内にコメントで書かれている `Example` を参考に、`prefix`・`body`・`description` を追加する

上記の例では `prefix` に `@pc` を設定しているため、SCSS ファイル内で `@pc` と入力すると `@media screen and (min-width: 768px) { }` に変換される。`$1` の部分はスニペット展開後にカーソルが移動する位置を表す。
