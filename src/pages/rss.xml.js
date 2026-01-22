import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../constant';

export async function GET(context) {
  const posts = await getCollection('posts', ({ data }) => {
    return import.meta.env.PROD ? data.status === 'publish' : true
  });

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteConfig.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/post/${post.id}/`,
    })),
    customData: `<language>ja</language>`,
  });
}
