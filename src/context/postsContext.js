import React, { useReducer, createContext } from "react"
import postsReducer from "./postsReducer"
import { UPDATE_STATUS, FETCH_POSTS } from "./actionTypes"
import client from "./../graphql/client"
import { POSTS } from "../graphql/query"

export const status = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  REJECTED: "REJECTED",
  RESOLVED: "RESOLVED",
}

const initialState = {
  status: status.IDLE,
  posts: [],
}

export const PostsContext = createContext(initialState)

export default function PostsProvider({ children }) {
  const [state, dispatch] = useReducer(postsReducer, initialState)

  function fetchPosts() {
    dispatch({ type: UPDATE_STATUS, payload: { status: status.PENDING } })
    client
      .query({ query: POSTS })
      .then(({ data }) => {
        dispatch({ type: FETCH_POSTS, payload: { posts: data.posts } })
        dispatch({ type: UPDATE_STATUS, payload: { status: status.RESOLVED } })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: UPDATE_STATUS, payload: { status: status.REJECTED } })
      })
  }

  return (
    <PostsContext.Provider
      value={{
        status: state.status,
        posts: state.posts,
        fetchPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}
