import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { siteConfig } from '../constant';

export async function GET(context) {
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: await pagesGlobToRssItems(allMdFiles),
    customData: `<language>ja</language>`,
  });
}
