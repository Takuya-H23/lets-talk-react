import { gql } from "apollo-boost"

export const UPDATE_POST = gql`
  mutation UpdatePost($key: String!, $input: UpdatePostInput) {
    updatePost(key: $key, input: $input) {
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
