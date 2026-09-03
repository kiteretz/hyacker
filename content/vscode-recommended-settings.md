---
title: VS Codeで最初に変えておくと便利な設定は？
description: VS Code をインストールしたら最初に見直しておきたい設定として、files.trimTrailingWhitespace と Word Wrap の設定方法を解説します
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

`Code → Preferences → Settings` から設定画面を開き、以下の2つを変更しておくと作業がしやすくなる。

- `files.trimTrailingWhitespace`: `true` にして、保存時に行末の余分なスペースを自動削除する
- `Word Wrap`: `On` にして、長い行をディスプレイの幅に合わせて折り返す

## 解説

### files.trimTrailingWhitespace

コードの各行末に意図せず残ってしまう半角スペースを、保存のタイミングで自動的に削除してくれる設定。

Settings 画面の検索ボックスで `files.trimTrailingWhitespace` を検索し、チェックを ON にする。

### Word Wrap

デフォルトでは長い1行のコードが横に伸び続け、横スクロールが必要になる。`Word Wrap` を `On` にしておくと、ディスプレイの幅に合わせて自動的に折り返して表示されるため、コード全体を見渡しやすくなる。

Settings 画面の検索ボックスで `Word Wrap` を検索し、値を `on` に変更する。
