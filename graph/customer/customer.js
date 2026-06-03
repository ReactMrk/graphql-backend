import { readFileSync } from "fs";
import { buildSchema } from "graphql";

let customers = [];

const typeDefs = buildSchema(
  readFileSync("./graph/customer/customer.graphql", "utf8")
);

const resolvers = {
  Query: {
    getCustomer: (_, { email } ) => customers.find((customer) => customer.email === email),
    getCustomers: (_, ) => customers
  },
  Mutation: {
    addCustomer: (_, { customer } ) => {
      if (!customer?.email) throw Error("Email is a mandatory field");
      customers.push(customer);
      return customers;
    },
    removeCustomer: (_, { email } ) => {
      if (customers.length === 0) throw Error("customers array is empty");
      customers = customers.filter(customer => customer?.email !== email);
      return customers;
    }
    }
};

export { typeDefs, resolvers };
