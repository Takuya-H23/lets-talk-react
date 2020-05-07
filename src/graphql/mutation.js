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
export const DELETE_POST = gql`
  mutation DeletePost($key: String!, $input: DeletePostInput) {
    deletePost(key: $key, input: $input) {
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
