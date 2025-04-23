import { readFileSync } from "fs";
import { buildSchema } from "graphql";

let customers = [];

const typeDefs = buildSchema(
  readFileSync("./graph/customer/customer.graphql", "utf8")
);

const resolvers = {
  Query: {
    getCustomers: () => customers,
    getCustomer: (_, { email } ) => customers.find((customer) => customer.email === email)
  },
  Mutation: {
    addCustomer: (_, { customer } ) => {
      if (!customer?.email) throw Error("Email is a mandatory field");
      customers.push(customer);
      return customers;
    },
    removeCustomer: (_, { email } ) => {
      customers = customers.filter((customer) => customer.email !== email);
      return customers;
    },
  },
  Customer: {
    async netSalary(customer) {
      return await new Promise((resolver) => {
        setTimeout(() => resolver(customer.grossSalary / 2), 2000);
      });
    },
  },
};

export { typeDefs, resolvers };
