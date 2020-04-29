import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost"

const link = new HttpLink({
  uri: "https://lets-talk-node.herokuapp.com/",
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
})

export default client
