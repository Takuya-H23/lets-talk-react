import { gql } from "apollo-boost"

export const CREATE_POST = gql`
  mutation CreatePost($key: String!, $input: CreatePostInput) {
    createPost(key: $key, input: $input) {
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

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($key: String!, $input: UpdateCommentInput) {
    updateComment(key: $key, input: $input) {
      id
      name
      text
      createdAt
      updatedAt
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation DeleteComment($key: String!, $input: DeleteCommentInput) {
    deleteComment(key: $key, input: $input) {
      id
      name
      text
      createdAt
      updatedAt
    }
  }
`
