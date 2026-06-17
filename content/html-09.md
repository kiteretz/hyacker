---
title: video と audio タグでメディアを埋め込む
description: HTML5 の video タグと audio タグを使ってウェブページに動画・音声を埋め込む方法を解説します
upDate: 2025-02-16
pubDate: 2025-02-16
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - HTML
status: publish
---

## 回答

HTML5 の `<video>` タグと `<audio>` タグでメディアを埋め込めます。

```html
<!-- 動画の埋め込み -->
<video
  src="movie.mp4"
  controls
  width="800"
  height="450"
  poster="thumbnail.jpg"
>
  お使いのブラウザは video タグに対応していません。
</video>

<!-- 複数のフォーマットを指定する場合 -->
<video controls>
  <source src="movie.webm" type="video/webm" />
  <source src="movie.mp4" type="video/mp4" />
</video>

<!-- 音声の埋め込み -->
<audio src="audio.mp3" controls></audio>
```

## 解説

### controls 属性

再生・停止・音量などのコントロールパネルを表示します。ユーザー操作が必要なメディアには必ず付けましょう。

### autoplay と muted

`autoplay` で自動再生できますが、多くのブラウザでは `muted` と組み合わせないと機能しません。

```html
<video src="bg.mp4" autoplay muted loop playsinline></video>
```

### poster 属性

動画が読み込まれる前に表示するサムネイル画像を指定します。

### アクセシビリティ

- 重要な動画にはキャプション（字幕）を提供する
- `<track>` タグで字幕ファイルを指定できる

```html
<video controls>
  <source src="movie.mp4" type="video/mp4" />
  <track kind="subtitles" src="captions.vtt" srclang="ja" label="日本語" />
</video>
```
