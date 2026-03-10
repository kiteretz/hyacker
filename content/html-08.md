---
title: HTML リスト要素（ul・ol・dl）の使い分け
description: HTML の3種類のリスト要素の特徴と、適切な使い分けの方法を解説します
upDate: 2025-02-10
pubDate: 2025-02-10
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - HTML
status: publish
---

## 回答

HTML には順序なしリスト `<ul>`、順序ありリスト `<ol>`、定義リスト `<dl>` の3種類があります。

```html
<!-- 順序なしリスト -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<!-- 順序ありリスト -->
<ol>
  <li>HTML を学ぶ</li>
  <li>CSS を学ぶ</li>
  <li>JavaScript を学ぶ</li>
</ol>

<!-- 定義リスト -->
<dl>
  <dt>HTML</dt>
  <dd>ウェブページの構造を作るマークアップ言語</dd>
  <dt>CSS</dt>
  <dd>ウェブページのスタイルを定義するスタイルシート言語</dd>
</dl>
```

## 解説

### ul（Unordered List）

順序に意味がない箇条書きに使います。ナビゲーションメニューや機能一覧など。

### ol（Ordered List）

手順や順位など、順序が重要なリストに使います。`start` 属性で開始番号を変更できます。

```html
<ol start="3">
  <li>3番目から始まるリスト</li>
  <li>4番目</li>
</ol>
```

### dl（Description List）

用語と説明のペアで使います。用語集、FAQ、メタデータの一覧などに適しています。

- `<dt>` : 用語（Definition Term）
- `<dd>` : 説明（Definition Description）
