const graphql = require('graphql'); // graphqlオブジェクトをimport
const Movie = require('../models/movie'); // Movieモデルをimport
// GraphQLに備わっている型をimportして使う
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

// GraphQLObjectTypeのインスタンスを生成
const MovieType = new GraphQLObjectType({
  // ここで必要なパラメーターを渡す
  name: 'Movie', // Type名
  // fieldsで取得したいデータとその型を定義
  // 関数でラップしてカプセル化
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

// MovieTypeを外部から取得するためのクエリを定義
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    // MovieTypeのインスタンスを返す
    movie: {
      type: MovieType,
      // argsには検索時に利用するパラメーターを定義
      args: { id: { type: GraphQLID } },
      // argsを用いて取得するデータを定義
      resolve(parents, args) {
        // Movieモデルからデータを取得 findByIdはmongooseのメソッド
        return Movie.findById(args.id);
      },
    },
  }),
});

// GraphQLObjectTypeでmutationオブジェクトを生成
// データの更新の処理
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields:{
    addMovie: {
      type: MovieType, // movieを扱うのでmovieType
      // argsには更新時に利用するパラメーターを定義
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
      },
      resolve(parents, args) {
        // new Movie()でモデルのインスタンスを生成
        // save()でデータを保存
        const movie = new Movie({
          name: args.name, // 受け取った値を代入
          genre: args.genre,
        });
        // saveメソッドを使ってデータを保存
        // 追加した値が返ってくる
        return movie.save();
      }
    }
  }
})

// GrapohQLのスキーマとしてexport
module.exports = new graphql.GraphQLSchema({
  query: RootQuery, // queryオブジェクトをexport
  mutation: Mutation,  // mutationオブジェクトをexport
})
