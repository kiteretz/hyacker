// ビルドしないとPagefindのインデックスやJSが生成されない
// 開発環境では適当に0～3つのPostを返す
const dummyResult = () => {
  const max = Math.floor(Math.random() * 4);
  const stub = [
    {
      href: '#',
      title: '検索結果ダミー1',
      date: new Date(),
      tags: ['ダミー'],
      answer:
        'function fetchUser(id) {\n  return fetch(`/api/users/${id}`)\n    .then(res => res.json())\n    .then(data => data);\n}',
      isCode: true,
      lang: 'javascript',
    },
    {
      href: '#',
      title: '検索結果ダミー2',
      date: new Date(),
      tags: ['ダミー'],
      answer:
        'function fetchUser(id) {\n  return fetch(`/api/users/${id}`)\n    .then(res => res.json())\n    .then(data => data);\n}',
      isCode: true,
      lang: 'javascript',
    },
    {
      href: '#',
      title: '検索結果ダミー3',
      date: new Date(),
      tags: ['ダミー'],
      answer:
        'function fetchUser(id) {\n  return fetch(`/api/users/${id}`)\n    .then(res => res.json())\n    .then(data => data);\n}',
      isCode: true,
      lang: 'javascript',
    },
    {
      href: '#',
      title: '検索結果ダミー4',
      date: new Date(),
      tags: ['ダミー'],
      answer:
        'function fetchUser(id) {\n  return fetch(`/api/users/${id}`)\n    .then(res => res.json())\n    .then(data => data);\n}',
      isCode: true,
      lang: 'javascript',
    },
    {
      href: '#',
      title: '検索結果ダミー5',
      date: new Date(),
      tags: ['ダミー'],
      answer:
        'function fetchUser(id) {\n  return fetch(`/api/users/${id}`)\n    .then(res => res.json())\n    .then(data => data);\n}',
      isCode: true,
      lang: 'javascript',
    },
  ];
  return stub.slice(0, max);
};

export default dummyResult;
