const dummyResult = () => {
  const max = Math.ceil( ( Math.random() * 10 ) ) - 3
  const stub = [
      {
        href: "#",
        title: "検索結果ダミー1"
      },
      {
        href: "#",
        title: "検索結果ダミー2"
      },
      {
        href: "#",
        title: "検索結果ダミー3"
      },
      {
        href: "#",
        title: "検索結果ダミー4"
      },
      {
        href: "#",
        title: "検索結果ダミー5"
      },
    ]
  return stub.slice(0,max)
}

export default dummyResult
