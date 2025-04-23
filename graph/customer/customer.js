import { readFileSync } from "fs";
import { buildSchema } from "graphql";

let customers = [];

const typeDefs = buildSchema(
  readFileSync("./graph/customer/customer.graphql", "utf8")
);

const resolvers = {
  Query: {
    getCustomer: (_, { email } ) => customers.find((customer) => customer.email === email)
  },
  Mutation: {
    addCustomer: (_, { customer } ) => {
      if (!customer?.email) throw Error("Email is a mandatory field");
      customers.push(customer);
      return customers;
    }
  }
};

export { typeDefs, resolvers };
