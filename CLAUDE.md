# CLAUDE.md

Claude Code がこのリポジトリで作業する際の指示です。

## コーディング規約

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

| エイリアス | 対象 |
|---|---|
| `@components/*` | `src/components/*` |
| `@layouts/*` | `src/layouts/*` |
| `@libs/*` | `src/libs/*` |
| `@utils/*` | `src/utils/*` |
| `@scripts/*` | `src/scripts/*` |
| `@/*` | `src/*`（`src/` 直下のファイル用） |

- `src/` 配下サブディレクトリへの import は必ずエイリアスを使う（相対パス禁止）
- `src/` 直下のファイル（`constant.ts` など）は `@/` を使う
- 同一ディレクトリ内の import は相対パス（`./Nav.astro`）でよい

### コンポーネントのファイル形式

- 静的・SSR → `.astro`
- インタラクティブ（React Islands） → `.tsx`
