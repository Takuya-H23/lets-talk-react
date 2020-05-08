/**@jsx jsx */
import { useState } from "react"
import { css, jsx } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import { useMutation } from "@apollo/react-hooks"
import { useHistory } from "react-router-dom"
import { UPDATE_POST, DELETE_POST } from "../../graphql/mutation"
import { GET_POSTS } from "../../graphql/query"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import colors from "../../assets/colors"
import Modal from "./Modal"
import validateString from "../../functions/validateString"
import { Alert } from "antd"

export default function Options({ id, type }) {
  const [showModal, setShowModal] = useState(false)
  const [currentModal, setCurrentModal] = useState(null)
  const [key, setKey] = useState("")
  const [keyError, setKeyError] = useState(null)
  const [error, setError] = useState(null)
  const history = useHistory()

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
      setError("Something went wrong. Was your key correct?")
    },
    onCompleted: () => {
      history.push("/")
    },
  })

  function handleOnChange(e) {
    setKey(e.target.value)
  }

  function handleOnSubmit(requestFn, errorFn) {
    return function getVariable(obj) {
      return function checkArgs(...args) {
        const areValid = args.map(validateString)
        if (areValid.every(Boolean)) {
          return requestFn(obj)
        }
        errorFn("Please enter a valid value")
      }
    }
  }

  function closeModal() {
    setCurrentModal(null)
    setShowModal(false)
  }

  function openModal(flag) {
    setCurrentModal(flag)
    setShowModal(true)
  }

  if (error) return <Alert message={error} type="error" showIcon />
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
        onClick={
          () => {
            openModal("delete")
          }
          // deletePost({ variables: { key: "yoyoyo", input: { id } } })
        }
      />
      {showModal && currentModal === "update" && (
        <Modal onClick={closeModal}></Modal>
      )}
      {showModal && currentModal === "delete" && (
        <Modal onClick={closeModal}>
          <form
            onSubmit={e => {
              e.preventDefault()
              handleOnSubmit(
                deletePost,
                setKeyError
              )({ variables: { key, input: { id } } })(key)
            }}
          >
            <label htmlFor="delete">Key:</label>
            <input
              id="delete"
              type="text"
              value={key}
              onChange={handleOnChange}
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
