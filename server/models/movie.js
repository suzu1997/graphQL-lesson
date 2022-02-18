// データベースモデルを作成(movieモデル)

const mongoose = require('mongoose');
// mongooseスキーマを利用してスキーマを作成
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  genre: String,
});
// mongooseモデルとしてexport
// 引数には名前と作成したスキーマを渡す
module.exports = mongoose.model('Movie', movieSchema);
