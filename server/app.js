const express = require('express');
// express-graphqlからgraphqlHTTPをimport
const { graphqlHTTP } = require('express-graphql');
// MongoDBへの接続用にmongooseをimport
const mongoose = require('mongoose');

// expressのインスタンスを生成
// アプリケーション構築に必要な機能を提供する
const app = express();

// MongoDBとの接続
mongoose.connect(
  'mongodb+srv://admin:Chie0326@cluster0.bl2ch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
);
// 接続完了時のイベントリスナーに関数を登録
mongoose.connection.once('open', () => {
  console.log('db connected');
});

// 一つのエンドポイントでデータのやりとりを行うためにミドルウェアを作成
// 第一引数にパス、第二引数にミドルウェアのハンドラー関数
app.use(
  '/graphql',
  graphqlHTTP({
    // schemaはgraphqlのスキーマを定義
  })
);

// listen関数でサーバーを起動
// 第一引数にポート番号、第二引数にコールバック関数
app.listen(4000, () => {
  console.log('listening port 4000');
});
