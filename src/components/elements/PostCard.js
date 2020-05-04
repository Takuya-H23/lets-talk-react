/** @jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import formatDate from "../../functions/formatDate"
import colors from "../../assets/colors"

function PostCard({ id, name, text, comments, updatedAt, createdAt }) {
  return (
    <Li>
      <Link to={`/post/${id}`}>
        <H2>{text}</H2>
        <div>
          <span>by {name}</span>
          <span>
            {createdAt === updatedAt
              ? `created at ${formatDate(createdAt)}`
              : `updated at ${formatDate(updatedAt)}`}
          </span>
        </div>
        <div>
          <span>
            {comments.length
              ? `${comments.length} comment${comments.length === 1 ? "" : "s"}`
              : `No comment yet`}
          </span>
        </div>
      </Link>
    </Li>
  )
}

const H2 = styled.h2`
  color: ${colors.black};
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const Li = styled.li`
  border: 1px solid ${colors.rhythm};
  padding: 1rem;
`

export default PostCard
