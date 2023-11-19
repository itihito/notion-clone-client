## ローカル環境構築手順

1. API の BASE_URL を修正する
   /src/api/axiosClient.js を以下の通り修正

```js
// const BASE_URL = "http://localhost:5000/api/v1";
const BASE_URL = "https://notion-clone-server-lk8y.onrender.com/api/v1";
```

↓ このように修正する

```js
const BASE_URL = "http://localhost:5000/api/v1";
// const BASE_URL = "https://notion-clone-server-lk8y.onrender.com/api/v1";
```

2. `$ npm install`
3. `$ npm start`
4. コンソール画面に以下が表示されればクライアント側のローカル起動完了です

```
  VITE v4.5.0  ready in 674 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

\*他のアプリ等で 5173 ポートが使われている場合、ポート番号がズレます。その場合、サーバー側は 5173 ポートで CORS 設定を行っているため、5173 ポート以外のリクエストは弾かれてしまうため注意してください。

5. `http://127.0.0.1:5173/#/login`にアクセスしてアプリを利用できます！
