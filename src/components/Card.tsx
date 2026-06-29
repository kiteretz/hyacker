import { useEffect, useRef, useState } from 'react';
import { twJoin } from 'tailwind-merge';

import { formatDate } from '@utils/formatDate';

import type { FC } from 'react';

export type Card = {
  href: string;
  title: string;
  date: Date | string;
  tags: string[];
  img?: string;
  answer: string;
  isCode: boolean;
  highlightedCode?: string;
  lang?: string;
};

/**
 * Card コンポーネントは Astro での HTML ビルド時と、検索結果の表示のために React から呼び出される
 * 両対応にするために tsx ファイルとしている。
 * また、Astro が読み出す MarkDown コンテンツと、Pagefind の検索結果の2つがデータソースになる。
 */

const SHIKI_THEME = 'github-dark' as const;

// クライアントサイド用シングルトン（検索結果カードで使用）
let clientHighlighterPromise: Promise<any> | null = null;
function getClientHighlighter() {
  if (!clientHighlighterPromise) {
    clientHighlighterPromise = import('shiki').then(({ createHighlighter }) =>
      createHighlighter({
        themes: [SHIKI_THEME],
        langs: ['typescript', 'javascript', 'tsx', 'jsx', 'css', 'html', 'python', 'bash', 'json', 'text'],
      }),
    );
  }
  return clientHighlighterPromise;
}

const Card: FC<Card> = ({ href, title, date, tags, img, answer, isCode, highlightedCode, lang }) => {
  const [copied, setCopied] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [renderedCode, setRenderedCode] = useState<string | undefined>(highlightedCode);
  const [isActive, setIsActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowTop(el.scrollTop > 0);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, [answer]);

  // highlightedCode が渡されない（検索結果）場合はクライアントサイドで Shiki を実行
  useEffect(() => {
    if (highlightedCode !== undefined || !isCode || !answer) return;
    let cancelled = false;
    getClientHighlighter().then((hl) => {
      if (!cancelled) {
        setRenderedCode(hl.codeToHtml(answer, { lang: lang ?? 'text', theme: SHIKI_THEME }));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [answer, highlightedCode, isCode, lang]);

  const bottomMask = 'linear-gradient(to top, transparent 0px, black 24px)';
  const topMask = showTop ? 'linear-gradient(to bottom, transparent 0px, black 24px)' : 'linear-gradient(black, black)';
  const leftMask = showLeft
    ? 'linear-gradient(to right, transparent 0px, black 24px)'
    : 'linear-gradient(black, black)';
  const rightMask = showRight
    ? 'linear-gradient(to left, transparent 0px, black 24px)'
    : 'linear-gradient(black, black)';
  const maskImage = `${bottomMask}, ${topMask}, ${leftMask}, ${rightMask}`;

  const handleCopy = () => {
    if (!answer) return;
    navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a
      href={href}
      className={twJoin(
        'relative block h-367 transition-all duration-200 perspective-normal',
        isActive ? 'z-1 animate-card-lift outline-transparent' : '',
      )}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div
        className={twJoin(
          'h-full transition-transform duration-500 ease-in-out transform-3d focus-within:rotate-y-180',
          isActive && 'rotate-y-180 delay-100',
        )}
      >
        {/* front */}
        <div className="absolute inset-0 grid grid-rows-[auto_auto_auto_1fr] bg-white p-8 backface-hidden">
          <h3 className="mb-8 px-8 text-18 font-semibold">{title}</h3>
          <p className="px-8 font-space-grotesk text-14 text-neutral-400">{formatDate(date)}</p>
          <ul className="flex flex-wrap px-8 font-inter text-14 text-neutral-400">
            {tags?.map((tag) => (
              <li key={tag} className='after:mr-2 after:content-[","] last:after:content-none'>
                {tag}
              </li>
            ))}
          </ul>
          {img && <img src={img} width="" height="" alt="" className="aspect-video self-end rounded-8 object-cover" />}
        </div>
        {/* back */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex rotate-y-180 flex-col bg-neutral-800 p-8 backface-hidden"
        >
          {/* スクロール領域＋グラデーション */}
          <div className="relative min-h-0 flex-1">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="absolute inset-0 scrollbar-hidden overflow-auto p-8"
              style={{
                maskImage,
                WebkitMaskImage: maskImage,
                maskComposite: 'intersect, intersect, intersect',
                WebkitMaskComposite: 'destination-in, destination-in, destination-in',
              }}
            >
              {renderedCode ? (
                <div className="shiki-card" dangerouslySetInnerHTML={{ __html: renderedCode }} />
              ) : isCode ? (
                <pre className="font-mono text-12 whitespace-pre text-neutral-200">
                  <code>{answer}</code>
                </pre>
              ) : (
                <p className="text-14 leading-relaxed text-neutral-200">{answer}</p>
              )}
            </div>
          </div>
          {/* ボトムバー */}
          <div className="flex justify-between p-8 text-14 leading-tight text-neutral-400">
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleCopy();
              }}
              className="flex cursor-pointer items-center gap-2 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinejoin="bevel" strokeWidth="1.167" d="M9.333 11.333h-7v-7" />
                <path stroke="currentColor" strokeLinejoin="bevel" strokeWidth="1.167" d="M4.333 2.333h7v7h-7z" />
              </svg>
              <p>{copied ? 'Copied!' : 'Copy'}</p>
            </div>
            <p>Learn More →</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Card;
