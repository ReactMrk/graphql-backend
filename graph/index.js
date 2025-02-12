import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs as clientTypeDefs, resolvers as clientResolvers } from './client/client.js';

const schema = makeExecutableSchema({
  typeDefs: [
    clientTypeDefs
  ],
  resolvers: merge(
    clientResolvers
  )
});

export { schema };