/**@jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/core"
import styled from "@emotion/styled"
import Section from "./elements/Section"
import PostCard from "./elements/PostCard"
import Button from "./elements/Button"
import Modal from "./elements/Modal"
import useInput from "./hooks/useInput"
import { sendRequest } from "./../functions/api"
import { CREATE_POST } from "../graphql/mutation"
import { GET_POSTS } from "../graphql/query"
import { useMutation } from "@apollo/react-hooks"
import { message } from "antd"
import colors from "../assets/colors"
import Textarea from "./elements/Textarea"

function Home({ posts }) {
  const [showModal, setShowModal] = useState(false)
  const [key, keyBind] = useInput()
  const [keyError, setKeyError] = useState(null)
  const [nameError, setNameError] = useState(null)
  const [textError, setTextError] = useState(null)
  const [text, textBind] = useInput()
  const [name, nameBind] = useInput()

  const [createPost] = useMutation(CREATE_POST, {
    update(cache, { data: { createPost } }) {
      const { posts } = cache.readQuery({ query: GET_POSTS })
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: [createPost, ...posts] },
      })
    },
    onError: error => message.error(error.message),
    onCompleted: () => closeModal(),
  })

  function closeModal() {
    setShowModal(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const payload = [
      { key, errorFn: setKeyError },
      { name, errorFn: setNameError },
      { text, errorFn: setTextError },
    ]
    const createPostFn = () =>
      createPost({ variables: { key, input: { text, name } } })
    sendRequest(payload)(createPostFn)
  }

  return (
    <Section>
      <Button onClick={() => setShowModal(true)}>New post</Button>
      {showModal && (
        <Modal title="Add new post" onClick={closeModal}>
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
                id="newNameKey"
                value={name}
                onChange={nameBind.onChange}
                type="text"
                css={input}
              />
              {nameError ? <p>{nameError}</p> : null}
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="newPostText">Text: </label>
              <Textarea
                id="newPostText"
                value={text}
                onChange={textBind.onChange}
              />
              {textError ? <p>{textError}</p> : null}
            </InputWrapper>
            <Button type="submit" css={button}>
              Submit
            </Button>
          </Form>
        </Modal>
      )}
      <Ul>
        {posts.map((post, index) => (
          <PostCard key={`post-${index}`} {...post} />
        ))}
      </Ul>
    </Section>
  )
}

const Ul = styled.ul`
  list-style: none;
  display: grid;
  row-gap: 2rem;
  margin-top: 2rem;
`
const Form = styled.form`
  display: grid;
  row-gap: 1rem;
`
const InputWrapper = styled.div`
  display: grid;
  row-gap: 0.3rem;
`
const button = css`
  margin-top: 2rem;
`
const input = css`
  border: 1px solid ${colors.rhythm};
  padding: 0.5rem;
`

export default Home
