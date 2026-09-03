---
title: VS Codeでおすすめの拡張機能は？
description: HTML・CSS のコーディングを効率化する VS Code のおすすめ拡張機能（GitLens、Auto Rename Tag など）を紹介します
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

`Code → Preferences → Extensions`（`Shift + Cmd + X`）から検索してインストールする。特におすすめなのは以下。

- `GitLens — Git supercharged`: コミットごとの変更が簡単に見られる
- `Auto Rename Tag`: HTML 内でペアになっているタグを自動で同時に修正できる
- `Color Highlight`: 色の指定が目で見て分かりやすくなる
- `EvilInspector`: 全角スペースを強調してくれる（消しやすくなる）
- `Highlight Matching Tag`: ペアのタグが強調される
- `htmltagwrap`: HTML で範囲を選択し `Option + W` で囲むタグを作成できる

## 解説

### インストール方法

サイドバーの Extensions アイコン、またはショートカット `Shift + Cmd + X` で拡張機能パネルを開き、検索窓に名前を入力してインストールする。

### 括弧の色分けについて

かつては `Bracket Pair Colorizer` という拡張機能で対応の括弧を色分けしていたが、現在は VS Code 本体の設定 `editor.bracketPairColorization.enabled` で標準対応しているため、追加インストールは不要。
