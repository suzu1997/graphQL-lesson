const graphql = require('graphql'); // graphqlオブジェクトをimport
const Movie = require('../models/movie'); // Movieモデルをimport
const Director = require('../models/director'); // Directorモデルをimport
// GraphQLに備わっている型をimportして使う
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList, // リスト型
  GraphQLNonNull, // NonNull型
} = graphql;

// Movieのスキーマを定義
// GraphQLObjectTypeのインスタンスを生成
const MovieType = new GraphQLObjectType({
  // ここで必要なパラメーターを渡す
  name: 'Movie', // Type名
  // fieldsで取得したいデータとその型を定義
  // 関数でラップしてカプセル化
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parents, args) {
        // parentsにはMovieモデルのデータが入る
        // MovieのdirectorIdから、関連するDirectorのデータを取得
        return Director.findById(parents.directorId);
      },
    },
  }),
});

// Directorのスキーマを定義
const DirectorType = new GraphQLObjectType({
  // ここで必要なパラメーターを渡す
  name: 'Director', // Type名
  // fieldsで取得したいデータとその型を定義
  // 関数でラップしてカプセル化
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    movies: {
      type: new GraphQLList(MovieType), // Directorには複数のMovieが紐づく
      resolve(parents, args) {
        // parentsにはDirectorの情報が入る
        // MovieのdirectorIdとDirectorのIDが一致するデータを取得
        return Movie.find({ directorId: parents.id });
      },
    },
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
      args: { id: { type: new GraphQLNonNull(GraphQLID) } }, // 型も指定する
      // argsを用いて取得するデータを定義
      resolve(parents, args) {
        // Movieモデルからデータを取得 findByIdはmongooseのメソッド
        return Movie.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLNonNull(new GraphQLList(MovieType)),
      resolve(parents, args) {
        return Movie.find(); // 全てのデータを取得
      },
    },
    director: {
      type: DirectorType,
      // argsには検索時に利用するパラメーターを定義
      args: { id: { type: new GraphQLNonNull(GraphQLID) } }, // 型も指定する
      resolve(parents, args) {
        return Director.findById(args.id); // idで絞り込み
      },
    },
    directors: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(DirectorType))),
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
        directorId: { type: GraphQLID },
      },
      resolve(parents, args) {
        // new Movie()でモデルのインスタンスを生成
        // save()でデータを保存
        const movie = new Movie({
          name: args.name, // 受け取った値を代入
          genre: args.genre,
          directorId: args.directorId,
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
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }, // typeは必須にしたいのでNonNullを使う
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
      },
      resolve(parents, args) {
        let updateMovie = {}; // 空オブジェクトを作成しておく
        args.name && (updateMovie.name = args.name); // 更新情報があれば、updateDirectorに代入
        args.genre && (updateMovie.genre = args.genre);
        args.directorId && (updateMovie.directorId = args.directorId);
        // findByIdAndUpdate(Id, 更新情報)で更新
        return Movie.findByIdAndUpdate(args.id, updateMovie, {
          new: true, // trueにすると更新後のデータを返す
        });
      },
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }, // typeは必須にしたいのでNonNullを使う
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parents, args) {
        let updateDirector = {}; // 空オブジェクトを作成しておく
        args.name && (updateDirector.name = args.name); // 更新情報があれば、updateDirectorに代入
        args.age && (updateDirector.age = args.age);
        // findByIdAndUpdate(Id, 更新情報)で更新
        return Director.findByIdAndUpdate(args.id, updateDirector, {
          new: true, // trueにすると更新後のデータを返す
        });
      },
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }, // typeは必須にしたいのでNonNullを使う
      },
      resolve(parents, args) {
        // findByIdAndRemove(Id)で削除
        return Movie.findByIdAndRemove(args.id);
      },
    },
    deleteDirector: {
      type: DirectorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }, // typeは必須にしたいのでNonNullを使う
      },
      resolve(parents, args) {
        // findByIdAndRemove(Id)で削除
        return Director.findByIdAndRemove(args.id);
      },
    },
  },
});

// GraphQLのスキーマとしてexport
module.exports = new graphql.GraphQLSchema({
  query: RootQuery, // queryオブジェクトをexport
  mutation: Mutation, // mutationオブジェクトをexport
});
