export function extractAnswer(body: string): { content: string; isCode: boolean; lang?: string } | undefined {
  const sections = body.split(/^## /m);
  const firstSection = sections[1];
  if (!firstSection) return undefined;

  const codeMatch = firstSection.match(/```(\w*)\n([\s\S]*?)```/);
  if (codeMatch?.[2]) {
    return {
      content: codeMatch[2].trim(),
      isCode: true,
      lang: codeMatch[1] || 'text',
    };
  }

  // コードブロックがない場合、見出し行を除いたテキストを取得
  const text = firstSection
    .replace(/^[^\n]*\n/, '')
    .split(/^#{1,6}\s/m)[0]
    .trim();
  if (!text) return undefined;
  return { content: text, isCode: false };
}
