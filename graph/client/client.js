import { readFileSync } from "fs";
import { buildSchema } from "graphql";

let clients = [];

const typeDefs = buildSchema(
  readFileSync("./graph/client/client.graphql", "utf8")
);

const resolvers = {
  Query: {
    getClients: () => clients,
    getClient: (_, { email } ) => clients.find((client) => client.email === email)
  },
  Mutation: {
    addClient: (_, { client } ) => {
      if (!client?.email) throw Error("Email is a mandatory field");
      clients.push(client);
      return clients;
    },
    removeClient: (_, { email } ) => {
      clients = clients.filter((client) => client.email !== email);
      return clients;
    },
  },
  Client: {
    async netSalary(client) {
      return await new Promise((resolver) => {
        setTimeout(() => resolver(client.grossSalary / 2), 2000);
      });
    },
  },
};

export { typeDefs, resolvers };
