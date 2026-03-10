---
title: table タグの正しい使い方
description: HTML の table タグを使って表を正しく作成する方法と、アクセシビリティを考慮したマークアップを解説します
upDate: 2025-01-21
pubDate: 2025-01-21
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - HTML
status: publish
---

## 回答

HTML テーブルは `<table>`、`<thead>`、`<tbody>`、`<tr>`、`<th>`、`<td>` を組み合わせて作成します。

```html
<table>
  <thead>
    <tr>
      <th scope="col">名前</th>
      <th scope="col">役割</th>
      <th scope="col">所属</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>田中 太郎</td>
      <td>エンジニア</td>
      <td>開発部</td>
    </tr>
    <tr>
      <td>佐藤 花子</td>
      <td>デザイナー</td>
      <td>デザイン部</td>
    </tr>
  </tbody>
</table>
```

## 解説

### th タグと scope 属性

`<th>` はヘッダーセルです。`scope="col"` で列のヘッダー、`scope="row"` で行のヘッダーであることをスクリーンリーダーに伝えます。

### caption タグ

テーブルの見出しには `<caption>` タグを使います。

```html
<table>
  <caption>2025年度のメンバー一覧</caption>
  ...
</table>
```

### colspan と rowspan

```html
<td colspan="2">2列にまたがるセル</td>
<td rowspan="3">3行にまたがるセル</td>
```

### テーブルの注意点

- レイアウト目的では table を使わない（CSS を使用する）
- 表形式のデータにのみ table を使用する
