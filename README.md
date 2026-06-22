# hyacker

The Encyclopedia for Creators  
クリエイターのための百科事典

## 新リポジトリに切り替え

このリポジトリを新規にクローンして、開発環境構築から再開お願いします。  
旧の Notion 連携バージョンは https://github.com/kiteretz/hyacker-archive に移動しました。

# Astro Starter Kit: Basics

```sh
pnpm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## 開発規約

### import の順序

Astro コードフェンス・TypeScript ファイルともに以下の順序でグループ分けする。
グループ間は空行で区切る。

1. Astro 組み込み（`astro`、`astro:content` など）
2. サードパーティライブラリ
3. `@layouts/*`
4. `@components/*`
5. `@libs/*`
6. `@utils/*`
7. `import type`（最後）

### パスエイリアス

- `src/` 配下サブディレクトリへの import は必ずエイリアスを使う（相対パス禁止）
- `src/` 直下のファイル（`constant.ts` など）は `@/` を使う
- 同一ディレクトリ内の import は相対パス（`./Nav.astro`）でよい

| エイリアス | 対象 |
|---|---|
| `@components/*` | `src/components/*` |
| `@layouts/*` | `src/layouts/*` |
| `@libs/*` | `src/libs/*` |
| `@utils/*` | `src/utils/*` |
| `@scripts/*` | `src/scripts/*` |
| `@/*` | `src/*`（直下ファイル用） |

### コンポーネントのファイル形式

- 静的・SSR → `.astro`
- インタラクティブ（React Islands） → `.tsx`

## 更新
