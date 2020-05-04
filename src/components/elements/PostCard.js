/** @jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"

function PostCard({ name, text, comments, updatedAt, createdAt }) {
  return (
    <div>
      <h2>{text}</h2>
      <div>
        <span>by {name}</span>
        <span>
          {createdAt === updatedAt
            ? `created at ${createdAt}`
            : `updated at ${updatedAt}`}
        </span>
      </div>
      <div>
        <span>
          {comments.length
            ? `${comments.length} comment${comments.length === 1 ? "" : "s"}`
            : `No comment yet`}
        </span>
      </div>
    </div>
  )
}

export default PostCard
