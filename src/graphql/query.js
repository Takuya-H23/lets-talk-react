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

export const GET_POST = gql`
  query Post($id: ID!) {
    post(id: $id) {
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
