import { gql } from "apollo-boost"

export const POSTS = gql`
  query {
    posts {
      id
      name
      text
      createdAt
      updatedAt
      comments {
        id
        name
        text
        createdAt
        updatedAt
      }
    }
  }
`
