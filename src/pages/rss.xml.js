import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(context) {
  // __で始まる.mdファイルを除外
  const allMdFiles = Object.fromEntries(
    Object.entries(import.meta.glob("./**/*.md")).filter(
      ([path]) => !/\/__[^/]*\.md$/.test(path)
    )
  );

  return rss({
    title: "hyacker -- クリエイターのための百科事典",
    description: "クリエイターのための百科事典",
    site: context.site,
    items: await pagesGlobToRssItems(allMdFiles),
    customData: `<language>ja</language>`,
  });
}
