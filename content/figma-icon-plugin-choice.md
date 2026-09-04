---
title: Figmaのアイコンプラグインはどれを使う？（Feather / Lucide / Iconify）
description: Figma のアイコンプラグイン Feather Icons・Lucide・Iconify の違いと選び方、Iconify で複数セットを混在させるときの注意点を解説します
upDate: 2026-09-03
pubDate: 2026-09-03
author: とも
image:
  url: /assets/posts/card-thumbnail.svg
  alt: 画像の説明
tags:
  - Figma
status: draft
---

## 回答

- **Lucide**\
  アイコン数が多く（1,600 以上）、スタイルが統一されている。\
  UI 全体で使う主セットとして扱いやすい。\
  もとは React 用のパッケージ（`lucide-react`）だが、Figma には公式プラグインがある。
- **Feather Icons**\
  デザインは良いが数が少なく（約 280）、更新頻度も落ちている。\
  Lucide はこの Feather の fork。
- **Iconify**\
  多数のアイコンセットを横断検索できる。\
  数は圧倒的だが、セットごとに作り方（グリッド・線幅・角の処理）が違う。

## 解説

### セットを混在させない

Iconify で検索すると、見た目の似たアイコンが複数のセットからヒットする。\
UI の中では 1 つのセットに統一する。\
別セットのアイコンを混ぜると、1 つずつは正しくても、並べたときにちぐはぐに見える。

### 採用するセットをたどって確認する

Iconify はアイコンがどのセットのものかを表示する。\
採用する前にセット名を確認し、以降は同じセットから選ぶ。\
アイコンを自作するときも、既存セットの構造（24×24 グリッド、2px ストロークなど）を横断的に見比べる参考になる。

### Lucide を使うなら公式プラグイン

Lucide のアイコンを入れるときは、コミュニティによる二次配布ファイルではなく公式の Lucide Icons プラグインを使う。

### プラグインのリンク

- [Lucide Icons](https://www.figma.com/community/plugin/939567362549682242/lucide-icons) — 公式プラグイン。1,600 以上のアイコン
- [Feather Icons](https://www.figma.com/community/plugin/744047966581015514/feather-icons) — 公式プラグイン
- [Iconify](https://www.figma.com/community/plugin/735098390272716381/iconify) — オープンソースのアイコンセットを横断検索（200 セット以上）
