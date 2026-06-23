export function extractAnswer(body: string): { content: string; isCode: boolean } | undefined {
  const sections = body.split(/^## /m);
  const answerSection = sections.find((s) => s.startsWith('回答'));
  if (!answerSection) return undefined;

  const codeMatch = answerSection.match(/```\w*\n([\s\S]*?)```/);
  if (codeMatch?.[1]) {
    return {
      content: codeMatch[1].trim(),
      isCode: true,
    };
  }

  // コードブロックがない場合、見出し行を除いたテキストを取得
  const text = answerSection.replace(/^回答\n/, '').trim();
  if (!text) return undefined;
  return { content: text, isCode: false };
}
