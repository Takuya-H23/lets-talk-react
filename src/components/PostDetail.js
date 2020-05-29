/**@jsx jsx */
import { useState } from "react"
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"
import { GET_POST } from "../graphql/query"
import Section from "./elements/Section"
import Info from "./elements/Info"
import Comments from "./Comments"
import colors from "../assets/colors"
import Modal from "./elements/Modal"
import Button from "./elements/Button"

export default function PostDetail() {
  const [commentModal, setCommentModal] = useState(false)
  const { id: postId } = useParams()

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: postId },
  })

  if (loading) return <Section>Loading...</Section>

  if (error) return <Section>Something went wrong</Section>

  const { id, name, text, createdAt, updatedAt, comments } = data.post

  return (
    <Section>
      <PostWrapper>
        <Info
          postId={id}
          type="post"
          name={name}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />
        <H1>{text}</H1>
      </PostWrapper>
      {comments.length > 0 && <Comments comments={comments} postId={id} />}
      <Button onClick={() => setCommentModal(!commentModal)} center>
        Add comment
      </Button>
      {commentModal && (
        <Modal onClick={() => setCommentModal(!commentModal)}>
          <p>comment modal</p>
        </Modal>
      )}
    </Section>
  )
}

const PostWrapper = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1.5px solid ${colors.salmon};
  padding-bottom: 1rem;
`
const H1 = styled.h1`
  color: ${colors.black};
  font-size: 2rem;
  line-height: 1.3;
  margin-top: 1rem;
  margin-right: 2rem;
`
