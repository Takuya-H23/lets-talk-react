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
import { validatePayload } from "../../functions/validations"
import { message } from "antd"

export default function Options({ id, type }) {
  const [showModal, setShowModal] = useState(false)
  const [currentModal, setCurrentModal] = useState(null)
  const [keyError, setKeyError] = useState(null)
  const history = useHistory()
  const [key, bind] = useInput("")

  const [updatePost] = useMutation(UPDATE_POST)

  const [deletePost] = useMutation(DELETE_POST, {
    update(cache, { data: { deletePost } }) {
      const { posts } = cache.readQuery({ query: GET_POSTS })
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: posts.filter(post => post.id !== deletePost.id) },
      })
    },
    onError: () => {
      message.error("Something went wrong. Was your key correct?")
    },
    onCompleted: () => {
      history.push("/")
    },
  })

  function sendRequest(key, input) {
    validatePayload(key, ...Object.values(input))
      ? deletePost({ variables: { key, input } })
      : setKeyError()
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
      <AiFillEdit
        css={[icon, editIcon]}
        onClick={
          () => {
            openModal("update")
          }
          // handleClick(updatePost)({
          //   variables: { key: "yoyoyo", input: { id, text: "hello world3" } },
          // })
        }
      />
      <AiFillDelete
        css={[icon]}
        onClick={() => {
          openModal("delete")
        }}
      />
      {showModal && currentModal === "update" && (
        <Modal onClick={closeModal}></Modal>
      )}
      {showModal && currentModal === "delete" && (
        <Modal onClick={closeModal}>
          <form
            onSubmit={e => {
              e.preventDefault()
              sendRequest(key, { id })
            }}
          >
            <label htmlFor="delete">Key:</label>
            <input
              id="delete"
              type="text"
              value={key}
              onChange={bind.onChange}
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
