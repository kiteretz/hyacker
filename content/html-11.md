---
title: HTML の canvas タグで描画する
description: HTML5 の canvas タグと JavaScript を使ってグラフィックスを描画する基本的な方法を解説します
upDate: 2025-02-26
pubDate: 2025-02-26
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - HTML
  - JavaScript
status: publish
---

## 回答

`<canvas>` タグで描画エリアを作り、JavaScript の Canvas API で図形やテキストを描画します。

```html
<canvas id="myCanvas" width="400" height="300"></canvas>
```

```js
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 四角形を描画
ctx.fillStyle = '#3b82f6';
ctx.fillRect(50, 50, 200, 100);

// テキストを描画
ctx.fillStyle = 'white';
ctx.font = '24px sans-serif';
ctx.fillText('Hello Canvas!', 70, 110);

// 円を描画
ctx.beginPath();
ctx.arc(300, 150, 50, 0, Math.PI * 2);
ctx.fillStyle = '#ef4444';
ctx.fill();
```

## 解説

### getContext('2d')

2D描画のためのコンテキストを取得します。WebGL を使う場合は `'webgl'` を指定します。

### 主な描画メソッド

- `fillRect(x, y, width, height)` : 塗りつぶし四角形
- `strokeRect(x, y, width, height)` : 枠線四角形
- `arc(x, y, radius, startAngle, endAngle)` : 円弧
- `fillText(text, x, y)` : テキスト

### アニメーション

```js
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 描画処理
  requestAnimationFrame(animate);
}
animate();
```

Canvas はゲーム、グラフ、画像処理など幅広い用途で活用されています。
