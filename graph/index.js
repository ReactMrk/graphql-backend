import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs as customerTypeDefs, resolvers as customerResolvers } from './customer/customer.js';

const schema = makeExecutableSchema({
  typeDefs: [
    customerTypeDefs
  ],
  resolvers: merge(
    customerResolvers
  )
});

export { schema };