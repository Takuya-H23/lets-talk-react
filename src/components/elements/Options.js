/**@jsx jsx */
import { useState } from "react"
import { css, jsx } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import { useMutation } from "@apollo/react-hooks"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { useHistory } from "react-router-dom"
import useInput from "./../hooks/useInput"
import { UPDATE_POST, DELETE_POST } from "../../graphql/mutation"
import { GET_POSTS } from "../../graphql/query"
import colors from "../../assets/colors"
import Modal from "./Modal"
import { sendRequest } from "../../functions/api"
import { message } from "antd"

export default function Options({ id, type }) {
  const [showModal, setShowModal] = useState(false)
  const [currentModal, setCurrentModal] = useState(null)
  const [keyError, setKeyError] = useState(null)
  const [postError, setPostError] = useState(null)
  const history = useHistory()
  const [key, keyBind] = useInput("")
  const [post, postBind] = useInput("")

  const [updatePost] = useMutation(UPDATE_POST, {
    onError: error => {
      message.error(error.message + " ? Was your key correct?")
    },
    onCompleted: () => {
      setShowModal(false)
    },
  })

  const [deletePost] = useMutation(DELETE_POST, {
    update(cache, { data: { deletePost } }) {
      const { posts } = cache.readQuery({ query: GET_POSTS })
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: posts.filter(post => post.id !== deletePost.id) },
      })
    },
    onError: error => {
      message.error(error.message + " ? Was your key correct?")
    },
    onCompleted: () => {
      history.push("/")
    },
  })

  function sendUpdateRequest() {
    updatePost({ variables: { key, input: { id, text: post } } })
  }

  function sendDeleteRequest() {
    deletePost({ variables: { key, input: { id } } })
  }

  function closeModal() {
    setCurrentModal(null)
    setShowModal(false)
  }

  function openModal(flag) {
    setCurrentModal(flag)
    setShowModal(true)
  }

  return (
    <div>
      <AiFillEdit css={[icon, editIcon]} onClick={() => openModal("update")} />
      <AiFillDelete
        css={[icon]}
        onClick={() => {
          openModal("delete")
        }}
      />
      {showModal && currentModal === "update" && (
        <Modal onClick={closeModal}>
          <form
            onSubmit={e => {
              e.preventDefault()
              sendRequest([
                { key, errorFn: setKeyError },
                { post, errorFn: setPostError },
              ])(sendUpdateRequest)
            }}
          >
            <label htmlFor="updateKey">Key:</label>
            <input
              id="updateKey"
              type="text"
              value={key}
              onChange={keyBind.onChange}
            />
            {keyError ? <p>{keyError}</p> : null}
            <label htmlFor="updatePost">Post</label>
            <input
              type="text"
              id="updatePost"
              value={post}
              onChange={postBind.onChange}
            />
            {postError ? <p>{postError}</p> : null}
            <button type="submit">Send</button>
          </form>
        </Modal>
      )}
      {showModal && currentModal === "delete" && (
        <Modal onClick={closeModal}>
          <form
            onSubmit={e => {
              e.preventDefault()
              sendRequest([{ key, errorFn: setKeyError }])(sendDeleteRequest)
            }}
          >
            <label htmlFor="deleteKey">Key:</label>
            <input
              id="deleteKey"
              type="text"
              value={key}
              onChange={keyBind.onChange}
            />
            {keyError ? <p>{keyError}</p> : null}
          </form>
        </Modal>
      )}
    </div>
  )
}

Options.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

const icon = css`
  color: ${colors.rhythm};
  cursor: pointer;
`
const editIcon = css`
  margin-right: 0.5rem;
`
