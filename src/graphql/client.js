import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost"

const uri =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_GRAPHQL_PROD
    : process.env.REACT_APP_GRAPHQL

const link = new HttpLink({
  uri,
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
})

export default client
