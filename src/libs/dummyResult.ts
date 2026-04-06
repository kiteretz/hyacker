// ビルドしないとPagefindのインデックスやJSが生成されない
// 開発環境では適当に0～3つのPostを返す
const dummyResult = () => {
  const max = Math.ceil( ( Math.random() * 10 ) ) - 3
  const stub = [
      {
        href: "#",
        title: "検索結果ダミー1",
        date: new Date(),
        tags: ["ダミー"],
      },
      {
        href: "#",
        title: "検索結果ダミー2",
        date: new Date(),
        tags: ["ダミー"],
      },
      {
        href: "#",
        title: "検索結果ダミー3",
        date: new Date(),
        tags: ["ダミー"],
      },
      {
        href: "#",
        title: "検索結果ダミー4",
        date: new Date(),
        tags: ["ダミー"],
      },
      {
        href: "#",
        title: "検索結果ダミー5",
        date: new Date(),
        tags: ["ダミー"],
      },
    ]
  return stub.slice(0,max)
}

export default dummyResult
