import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { siteConfig } from '../constant';

export async function GET(context) {
  // __で始まる.mdファイルを除外
  const allMdFiles = Object.fromEntries(
    Object.entries(import.meta.glob('./**/*.md')).filter(([path]) => !/\/__[^/]*\.md$/.test(path)),
  );

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: await pagesGlobToRssItems(allMdFiles),
    customData: `<language>ja</language>`,
  });
}
