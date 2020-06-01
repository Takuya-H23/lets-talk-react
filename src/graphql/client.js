import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost"

const link = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL,
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
})

export default client
