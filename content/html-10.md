---
title: HTML の data 属性とは？
description: HTML の data-* 属性を使ってカスタムデータを HTML 要素に持たせる方法と、JavaScript からのアクセス方法を解説します
upDate: 2025-02-21
pubDate: 2025-02-21
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - HTML
status: publish
---

## 回答

`data-*` 属性を使うことで、HTML 要素に任意のカスタムデータを埋め込めます。

```html
<!-- data 属性でカスタムデータを保持 -->
<button
  data-user-id="123"
  data-action="delete"
  data-confirm="本当に削除しますか？"
>
  削除
</button>
```

```js
// JavaScript から dataset でアクセス
const button = document.querySelector('button');
console.log(button.dataset.userId);  // "123"
console.log(button.dataset.action);  // "delete"
console.log(button.dataset.confirm); // "本当に削除しますか？"
```

## 解説

### dataset プロパティ

JavaScript では `element.dataset` で `data-*` 属性にアクセスできます。`data-user-id` はキャメルケースの `userId` として参照します。

### CSS での活用

```css
/* data 属性をセレクタとして使用 */
[data-action="delete"] {
  color: red;
}

/* attr() で値を表示 */
[data-confirm]::after {
  content: attr(data-confirm);
}
```

### 使いどころ

- JavaScript に渡すためのデータを HTML に持たせる
- CSS の条件付きスタイリング
- アクセシビリティ情報の補足

注意点として、セキュリティに関わるデータ（パスワード、トークンなど）は data 属性に入れてはいけません。
