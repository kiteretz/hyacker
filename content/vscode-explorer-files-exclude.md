---
title: VS Codeのエクスプローラーで特定のフォルダを表示・非表示にするには？
description: .vscode/settings.json の files.exclude を使い、.git フォルダなど通常は隠れているフォルダを VS Code のサイドバーに表示する方法を解説します
upDate: 2026-08-19
pubDate: 2026-08-19
author: とも
image:
  url: /assets/posts/card-thumbnail.svg
  alt: 画像の説明
tags:
  - VS Code
status: publish
---

## 回答

プロジェクト直下に `.vscode/settings.json` を作成し、`files.exclude` に対象のパターンを `false` で指定すると、通常は非表示になっているフォルダをサイドバーに表示できる。

```json
{
  "files.exclude": {
    "**/.git": false
  }
}
```

## 解説

### files.exclude の仕組み

`files.exclude` はエクスプローラーに表示するファイル・フォルダを制御する設定。デフォルトでは `.git` フォルダなどが非表示になっているが、対象パターンに `false` を指定すると「除外しない＝表示する」という意味になる。

### 設定方法

プロジェクトのルートに `.vscode/settings.json` を作成し、上記の内容を記述する。この設定はプロジェクト単位（ワークスペース単位）で有効になる。
