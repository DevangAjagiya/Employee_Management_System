const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { typeDefs } = require("./Schema");
const { connectDB } = require("./connectdb");
const resolvers = require("./resolver");

const app = express();
const PORT = 9000;

app.get("/", (req, res) => {
  res.send("Server Started!");
});

// Creating Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  await connectDB();
  app.listen(PORT, () => {
    console.log(
      `Server started at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
