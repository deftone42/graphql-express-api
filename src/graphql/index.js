const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID
} = require('graphql');

const {
  connectionDefinitions,
  connectionFromPromisedArray,
  connectionArgs
} = require('graphql-relay');

const { nodeField } = require('./node');
const { getObjectById, getArticles } = require('../api');

const { articleMutation } = require('./mutations');
const { articleType } = require('./types');

const { connectionType: ArticleConnection } = connectionDefinitions({
  nodeType: articleType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of objects in this connection.',
      resolve: (conn) => {
        return conn.edges.length;
      },
    },
  }),
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type.',
  fields: {
    node: nodeField,
    articles: {
      type: ArticleConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(
        getArticles(),
        args
      ),
    },
    article: {
      type: articleType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The id of the article.',
        },
      },
      resolve: (_, args) => {
        return getObjectById(args.id);
      },
    },
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root Mutation type.',
  fields: {
    createArticle: articleMutation,
  },
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

exports.schema = schema; 