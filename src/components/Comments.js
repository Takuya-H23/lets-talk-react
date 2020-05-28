/**@jsx jsx */
import { useEffect } from "react"
import { Fragment } from "react"
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import colors from "../assets/colors"
import Info from "./elements/Info"

export default function Comments({ comments, postId }) {
  return (
    <Fragment>
      <P>
        {comments.length} comment{comments.length === 0 ? "" : "s"}
      </P>
      <ul>
        {comments.map(comment => (
          <Li key={comment.id}>
            <Info
              postId={postId}
              commentId={comment.id}
              type="comment"
              name={comment.name}
              createdAt={comment.createdAt}
              updatedAt={comment.updatedAt}
            />
            <H2>{comment.text}</H2>
          </Li>
        ))}
      </ul>
    </Fragment>
  )
}

Comments.propTypes = {
  postId: PropTypes.string,
  comments: PropTypes.array.isRequired,
}

const Li = styled.li`
  margin-bottom: 1.5rem;
`
const P = styled.p`
  text-align: center;
  margin-bottom: 1rem;
`
const H2 = styled.h2`
  color: ${colors.black};
  font-size: 1.8rem;
`
