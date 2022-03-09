const graphql = require('graphql'); // graphqlオブジェクトをimport
const Movie = require('../models/movie'); // Movieモデルをimport
const Director = require('../models/director'); // Directorモデルをimport
// GraphQLに備わっている型をimportして使う
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } =
  graphql;

// Movieのスキーマを定義
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

// Directorのスキーマを定義
const DirectorType = new GraphQLObjectType({
  // ここで必要なパラメーターを渡す
  name: 'Director', // Type名
  // fieldsで取得したいデータとその型を定義
  // 関数でラップしてカプセル化
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
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
      args: { id: { type: GraphQLID } }, // 型も指定する
      // argsを用いて取得するデータを定義
      resolve(parents, args) {
        // Movieモデルからデータを取得 findByIdはmongooseのメソッド
        return Movie.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parents, args) {
        return Movie.find(); // 全てのデータを取得
      },
    },
    director: {
      type: DirectorType,
      // argsには検索時に利用するパラメーターを定義
      args: { id: { type: GraphQLID } }, // 型も指定する
      resolve(parents, args) {
        return Director.findById(args.id); // idで絞り込み
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parents, args) {
        return Director.find(); // 全てのデータを取得
      },
    },
  }),
});

// GraphQLObjectTypeでmutationオブジェクトを生成
// データの更新の処理
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
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
      },
    },
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parents, args) {
        const director = new Director({
          name: args.name,
          age: args.age,
        });
        return director.save();
      },
    },
  },
});

// GraphQLのスキーマとしてexport
module.exports = new graphql.GraphQLSchema({
  query: RootQuery, // queryオブジェクトをexport
  mutation: Mutation, // mutationオブジェクトをexport
});
