const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');
const { mutationWithClientMutationId } = require('graphql-relay');

const { createArticle } = require('../../api');
const { articleType } = require('../types');

const articleMutation = mutationWithClientMutationId({
  name: 'AddArticle',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the article.',
    },
    author: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The author of the article.',
    },
    text: {
      type: GraphQLString,
      description: 'The article\'s content.',
    },
    published: {
      type: GraphQLBoolean,
      description: 'Whether or not the article is published.',
    }
  },
  outputFields: {
    article: {
      type: articleType,
    },
  },
  mutateAndGetPayload: (args) => new Promise((resolve, reject) => {
    Promise.resolve(createArticle(args))
      .then((article) => resolve({ article }))
      .catch(reject);
  }),
});

exports.articleMutation = articleMutation;