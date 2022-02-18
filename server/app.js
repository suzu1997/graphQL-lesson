const express = require('express');
// express-graphqlからgraphqlHTTPをimport
const graphqlHTTP = require('express-graphql');

// expressのインスタンスを生成
// アプリケーション構築に必要な機能を提供する
const app = express();

// 一つのエンドポイントでデータのやりとりを行うためにミドルウェアを作成
// 第一引数にパス、第二引数にミドルウェアのハンドラー関数
app.use('/graphql', graphqlHTTP({
  // schemaはgraphqlのスキーマを定義

}))

// listen関数でサーバーを起動
// 第一引数にポート番号、第二引数にコールバック関数
app.listen(4000, () => {
  console.log('listening port 4000');
})