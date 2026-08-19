---
title: WordPressの翻訳ファイル（.po/.mo）を更新するには？
description: WordPress の翻訳ファイル .pot・.po・.mo の役割の違いと、Poedit と VS Code を組み合わせて日本語の翻訳を更新する手順を解説します
upDate: 2026-08-19
pubDate: 2026-08-19
author: とも
image:
  url: /assets/posts/card-thumbnail.svg
  alt: 画像の説明
tags:
  - WordPress
status: publish
---

## 回答

日本語部分はまず VS Code で編集しておき、その後 `.po` ファイルを Poedit で開いてそのまま保存すると、同じディレクトリに `.mo` ファイルが自動生成される。生成された `.mo` ファイルを配置先に置けば翻訳が反映される。

## 解説

### 翻訳ファイルの種類

翻訳ファイルは以下の3種類で構成されている。

| 拡張子 | 役割 |
| --- | --- |
| `.pot` | 翻訳テンプレートファイル |
| `.po` | 翻訳ファイル（編集可） |
| `.mo` | 翻訳ファイル（読み込み専用。実際に読み込まれるのはこちら） |

### 編集には専用ソフトが必要

`.po` ファイルの編集には [Poedit](https://poedit.net/) を使う。`.po` を編集する程度であれば無料版で利用できる。

### 更新手順

1. `.po` ファイルを VS Code で開き、翻訳したい日本語部分を編集する（Poedit 単体では日本語部分を編集できないため、先に VS Code で編集しておく）
2. 編集済みの `.po` ファイルを Poedit で開く
3. 内容を変更せずにそのまま保存すると、同じディレクトリに `.mo` ファイルが自動生成される
4. 自動生成された `.mo` ファイルを、反映させたい場所に配置する

### 参考

- [Poedit Translation Editor](https://poedit.net/)
- [Poedit マニュアル - lqd.jp](https://lqd.jp/wp/manual/manual_poedit.html)
- [WordPressの翻訳ファイルについて - Qiita](https://qiita.com/kazu_kazu/items/817749032d78bbcfe0e9)
