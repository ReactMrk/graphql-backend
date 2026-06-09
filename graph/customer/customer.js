import { readFileSync } from "fs";
import { buildSchema } from "graphql";

let customers = [];

const typeDefs = buildSchema(
  readFileSync("./graph/customer/customer.graphql", "utf8")
);

const resolvers = {
  Mutation: {
    addCustomer: (_, { customer } ) => {
      customers.push(customer);
      return customers;
    }
  }
};

export { typeDefs, resolvers };
