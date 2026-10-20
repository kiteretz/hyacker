import { getPostsByTag } from './postsByTag';

export type NavItem = {
  label: string;
  href: string;
};

// グローバルナビ（PC / SP 共通）の項目。Editor's Picksを除いたタグを記事数の多い順に tagLimit 件まで並べる
export const getNavItems = async (tabLimit: number): Promise<NavItem[]> => {
  const tags = await getPostsByTag();

  return [
    { label: 'Posts', href: '/post/' },
    { label: 'Tags', href: '/tags' },
    ...tags
      .filter(({ name }) => name !== "Editor's Picks")
      .slice(0, tabLimit)
      .map(({ name }) => ({ label: name, href: `/tags/${encodeURIComponent(name)}` })),
  ];
};
