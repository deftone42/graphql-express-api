'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');

const PORT = process.env.PORT || 3000;
const server = express();

const { schema } = require('./src/graphql');

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});