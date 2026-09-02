---
title: フックはどう探せばいいか？
description: （説明文。検索・OGPに使用）
upDate: 2026-09-02
pubDate: 2026-09-02
author: （執筆者名）
image:
  url: /assets/posts/card-thumbnail.svg
  alt: 画像の説明
tags:
  - WordPress
status: draft
---

## 回答

アクションやフィルターの名前が分かっていれば公式リファレンスの[Developer Resources](https://developer.wordpress.org/)で検索できます。また、関数リファレンスのhooksという項目には、その関数内部のフックがリストアップされています。あるいはプラグインやテーマ内部にもフックが用意されていることがあります、プラグインの開発元のサイトをみてみましょう。最終手段はPHPコードを直接調べることです。

## 解説

### WordPressのリファレンスで探す
WordPress 公式の開発者向けリファレンスで

### プラグインに用意されたフックを探す
例えばACFには、フックのリファレンスページがあります。
Yoast Duplicate Postの開発者向けページには[Filters and actions](https://developer.yoast.com/duplicate-post/filters-actions/)というリファレンスが用意されています。