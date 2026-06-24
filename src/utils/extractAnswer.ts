export function extractAnswer(
  body: string,
): { content: string; isCode: boolean; lang?: string } | undefined {
  const sections = body.split(/^## /m);
  const answerSection = sections.find((s) => s.startsWith('回答'));
  if (!answerSection) return undefined;

  const codeMatch = answerSection.match(/```(\w*)\n([\s\S]*?)```/);
  if (codeMatch?.[2]) {
    return {
      content: codeMatch[2].trim(),
      isCode: true,
      lang: codeMatch[1] || 'text',
    };
  }

  // コードブロックがない場合、見出し行を除いたテキストを取得
  const text = answerSection.replace(/^回答\n/, '').trim();
  if (!text) return undefined;
  return { content: text, isCode: false };
}
