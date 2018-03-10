const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} = require('graphql');
const { globalIdField } = require('graphql-relay');

const { nodeInterface } = require('../node');

const articleType = new GraphQLObjectType({
  name: 'Article',
  description: 'An article',
  fields: {
    id: globalIdField(),
    title: {
      type: GraphQLString,
      description: 'The title of the article.',
    },
    text: {
      type: GraphQLString,
      description: 'The article\'s content.',
    },
    author: {
      type: GraphQLString,
      description: 'The author of the article.',
    },
    published: {
      type: GraphQLBoolean,
      description: 'Whether or not the article is published.',
    },
    likes: {
      type: GraphQLInt,
      description: 'Number of likes for the article.',
    },
  },
  interfaces: [nodeInterface],
});

exports.articleType = articleType;