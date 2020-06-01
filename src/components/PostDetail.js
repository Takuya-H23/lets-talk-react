/**@jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import styled from "@emotion/styled"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_POST, GET_POSTS } from "../graphql/query"
import Section from "./elements/Section"
import Info from "./elements/Info"
import Comments from "./Comments"
import colors from "../assets/colors"
import Modal from "./elements/Modal"
import Button from "./elements/Button"
import useInput from "./hooks/useInput"
import { CREATE_COMMENT } from "../graphql/mutation"
import { sendRequest } from "../functions/api"
import { message } from "antd"
import Textarea from "./elements/Textarea"

export default function PostDetail() {
  const [showModal, setShowModal] = useState(false)
  const [key, keyBind] = useInput()
  const [keyError, setKeyError] = useState(null)
  const [nameError, setNameError] = useState(null)
  const [textError, setTextError] = useState(null)
  const [commentText, commentTextBind] = useInput()
  const [commentName, commentNameBind] = useInput()

  const { id: postId } = useParams()
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: postId },
  })

  const [createComment] = useMutation(CREATE_COMMENT, {
    update(cache, { data: { createComment } }) {
      const { posts } = cache.readQuery({ query: GET_POSTS })
      const _posts = posts.map(post => {
        if (post.id !== postId) return post
        post.comments = [createComment, ...post.comments]
        return post
      })

      cache.writeQuery({
        query: GET_POSTS,
        data: {
          posts: _posts,
        },
      })
    },
    onError: error => message.error(error.message),
    onCompleted: () => setShowModal(false),
  })

  function handleSubmit(e) {
    e.preventDefault()
    const payload = [
      { key, errorFn: setKeyError },
      { commentName, errorFn: setNameError },
      { commentText, errorFn: setTextError },
    ]
    const createCommentFn = () =>
      createComment({
        variables: {
          key,
          input: { postId, text: commentText, name: commentName },
        },
      })
    sendRequest(payload)(createCommentFn)
  }

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
      <Button onClick={() => setShowModal(!showModal)} center>
        Add comment
      </Button>
      {showModal && (
        <Modal onClick={() => setShowModal(!showModal)} title="Create comment">
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <label htmlFor="newPostKey">Key: </label>
              <input
                id="newPostKey"
                value={key}
                onChange={keyBind.onChange}
                type="text"
                css={input}
              />
              {keyError ? <p>{keyError}</p> : null}
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="newPostName">Name: </label>
              <input
                type="text"
                id="newNameKey"
                value={commentName}
                onChange={commentNameBind.onChange}
                css={input}
              />
              {nameError ? <p>{nameError}</p> : null}
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="newPostText">Text: </label>
              <Textarea
                id="newPostText"
                value={commentText}
                onChange={commentTextBind.onChange}
              />
              {textError ? <p>{textError}</p> : null}
            </InputWrapper>
            <Button type="submit" css={button}>
              Submit
            </Button>
          </Form>
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
const Form = styled.form`
  display: grid;
  row-gap: 1rem;
`
const InputWrapper = styled.div`
  display: grid;
  row-gap: 0.3rem;
`
const input = css`
  border: 1px solid ${colors.rhythm};
  padding: 0.5rem;
`
const button = css`
  margin-top: 2rem;
`
