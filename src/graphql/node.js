'use strict';

const {
  nodeDefinitions,
  fromGlobalId,
} = require('graphql-relay');
const { getObjectById } = require('../api');

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    return getObjectById(type.toLowerCase(), id);
  },
  (object) => {
    const { articleType } = require('./types');

    if (object.author && object.title) {
      return articleType;
    }

    return null;
  }
);

exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;