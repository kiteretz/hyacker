import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { siteInfo } from '../constant';

export async function GET(context) {
  // _ で始まるファイルはテンプレートなどのため除外
  const allMdFiles = Object.fromEntries(
    Object.entries(import.meta.glob('./**/*.md')).filter(([path]) => !/\/__[^/]*\.md$/.test(path)),
  );

  return rss({
    title: siteInfo.title,
    description: siteInfo.description,
    site: siteInfo.url,
    items: await pagesGlobToRssItems(allMdFiles),
    customData: `<language>ja</language>`,
  });
}
