const express = require('express');

// expressのインスタンスを生成
// アプリケーション構築に必要な機能を提供する
const app = express();

// listen関数でサーバーを起動
// 第一引数にポート番号、第二引数にコールバック関数
app.listen(4000, () => {
  console.log('listening port 4000');
})