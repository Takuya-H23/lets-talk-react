import { SEARCH_POSTS, FETCH_POSTS, UPDATE_STATUS } from "./actionTypes"

export default function postsReducer(state, { type, payload }) {
  switch (type) {
    case UPDATE_STATUS: {
      return {
        ...state,
        status: payload.status,
      }
    }
    case FETCH_POSTS:
      return {
        ...state,
        posts: payload.posts,
      }
    default:
      return state
  }
}
