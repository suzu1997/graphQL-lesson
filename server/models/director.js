// データベースモデルを作成(directorモデル)
const mongoose = require('mongoose');
// mongooseスキーマを利用してスキーマを作成
const Schema = mongoose.Schema;

const directorSchema = new Schema({
  name: String,
  age: Number,
});
// mongooseモデルとしてexport
// 引数には名前と作成したスキーマを渡す
module.exports = mongoose.model('Director', directorSchema);
