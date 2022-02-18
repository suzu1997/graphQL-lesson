const graphql = require('graphql'); // graphqlオブジェクトをimport
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
        
      },
    },
  }),
});
