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
        <TitleWrapper>
          <Span>by {name}</Span>
          <Span>
            {createdAt === updatedAt
              ? `created at ${formatDate(createdAt)}`
              : `updated at ${formatDate(updatedAt)}`}
          </Span>
        </TitleWrapper>
        <div>
          <Span secondary>
            {comments.length
              ? `${comments.length} comment${comments.length === 1 ? "" : "s"}`
              : `No comment yet`}
          </Span>
        </div>
      </Link>
    </Li>
  )
}

const TitleWrapper = styled.div`
  margin-bottom: 1rem;
`

const H2 = styled.h2`
  color: ${colors.black};
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.2;
`
const Li = styled.li`
  border: 1px solid ${colors.rhythm};
  padding: 1rem;
`
const Span = styled.span(({ secondary = false }) => ({
  color: secondary ? colors.rhythm : colors.salmon,
}))

export default PostCard
