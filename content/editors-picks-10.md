---
title: CSS の Box モデルを理解する
description: CSS の Box モデル（content、padding、border、margin）の仕組みと box-sizing プロパティの違いを解説します
upDate: 2025-02-20
pubDate: 2025-02-20
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - "Editor's Picks"
  - CSS
status: publish
---

## 回答

CSS のすべての要素は Box モデルで構成されます。内側から `content`、`padding`、`border`、`margin` の4つの領域があります。

```css
.box {
  width: 200px;       /* コンテンツ領域の幅 */
  padding: 16px;      /* 内側の余白 */
  border: 2px solid black; /* 枠線 */
  margin: 24px;       /* 外側の余白 */
}
```

## 解説

### box-sizing の違い

デフォルトの `content-box` では、`width` はコンテンツ領域のみの幅を指定します。`border-box` では `width` に padding と border を含めて計算します。

```css
/* content-box（デフォルト）: 実際の幅 = 200 + 32 + 4 = 236px */
.box {
  box-sizing: content-box;
  width: 200px;
  padding: 16px;
  border: 2px solid black;
}

/* border-box: 実際の幅 = 200px（padding と border を含む） */
.box {
  box-sizing: border-box;
  width: 200px;
  padding: 16px;
  border: 2px solid black;
}
```

### 全体に border-box を適用する

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

多くのプロジェクトでは上記のリセットを使って、すべての要素に `border-box` を適用しています。これにより直感的なサイズ指定ができます。
