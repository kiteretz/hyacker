import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// Post Collection
// https://docs.astro.build/en/guides/content-collections
// プロパティを追加したら、以下にも追記＆開発サーバー再起動で適用
const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./content" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    upDate: z.coerce.date(),
    pubDate: z.coerce.date(),
    author: z.string(),
    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
    tags: z.array(z.string().optional()),
  }),
});

// 複数のコレクション定義も可能
// const usersCollection = defineCollection({ /* ... */ });

export const collections = {
  posts
};
