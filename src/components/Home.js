/**@jsx jsx */
import { useState } from "react"
import { jsx } from "@emotion/core"
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
            <div>
              <Label htmlFor="newPostKey">Key: </Label>
              <input id="newPostKey" value={key} onChange={keyBind.onChange} />
              {keyError ? <p>{keyError}</p> : null}
            </div>
            <div>
              <Label htmlFor="newPostName">Name: </Label>
              <input
                id="newNameKey"
                value={name}
                onChange={nameBind.onChange}
              />
              {nameError ? <p>{nameError}</p> : null}
            </div>
            <div>
              <Label htmlFor="newPostText">Text: </Label>
              <input
                id="newPostText"
                value={text}
                onChange={textBind.onChange}
              />
              {textError ? <p>{textError}</p> : null}
            </div>
            <Button type="submit">Submit</Button>
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

// const AddPostBtn = styled(Button)`
//   padding: 0.5rem;
//   font-weight: bold;
// `
const Form = styled.form`
  display: flex;
  flex-direction: column;p
`
const Label = styled.label`
  display: block;
`
const Ul = styled.ul`
  list-style: none;
  display: grid;
  row-gap: 2rem;
  margin-top: 2rem;
`

export default Home
