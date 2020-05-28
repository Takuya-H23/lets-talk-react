/**@jsx jsx */
import { useState } from "react"
import { css, jsx } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import { useMutation } from "@apollo/react-hooks"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { useHistory } from "react-router-dom"
import useInput from "./../hooks/useInput"
import {
  UPDATE_POST,
  DELETE_POST,
  UPDATE_COMMENT,
  DELETE_COMMENT,
} from "../../graphql/mutation"
import { GET_POSTS, GET_POST } from "../../graphql/query"
import colors from "../../assets/colors"
import Modal from "./Modal"
import { sendRequest } from "../../functions/api"
import { message } from "antd"

export default function Options({ postId, commentId, type }) {
  const [showModal, setShowModal] = useState(false)
  const [currentModal, setCurrentModal] = useState(null)
  const [keyError, setKeyError] = useState(null)
  const [textError, setTextError] = useState(null)
  const history = useHistory()
  const [key, keyBind] = useInput("")
  const [text, textBind] = useInput("")

  const [updatePost] = useMutation(UPDATE_POST, {
    onError: error => {
      message.error(error.message + " ? Was your key correct?")
    },
    onCompleted: () => {
      setShowModal(false)
    },
  })

  const [updateComment] = useMutation(UPDATE_COMMENT, {
    onError: error => message.error(error.message + " ? Was your key correct?"),
    onCompleted: () => setShowModal(false),
  })

  const [deletePost] = useMutation(DELETE_POST, {
    update(cache, { data: { deletePost } }) {
      const { posts } = cache.readQuery({ query: GET_POSTS })
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: posts.filter(post => post.id !== deletePost.id) },
      })
    },
    onError: error => message.error(error.message + " ? Was your key correct?"),
    onCompleted: () => history.push("/"),
  })

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    update(cache, { data: { deleteComment } }) {
      const { post } = cache.readQuery({
        query: GET_POST,
        variables: { id: postId },
      })
      const { posts } = cache.readQuery({ query: GET_POSTS })
      cache.writeQuery({
        query: GET_POSTS,
        data: {
          posts: posts.map(post => {
            if (post.id !== postId) return post
            const newPost = { ...post }
            newPost.comment = post.comments.filter(
              comment => comment.id !== commentId
            )
            return newPost
          }),
        },
      })
      cache.writeQuery({
        query: GET_POST,
        data: {
          post: {
            ...post,
            comments: post.comments.filter(comment => comment.id !== commentId),
          },
        },
      })
    },
    onError: error => message.error(error.message + " ? Was your key correct?"),
  })

  function sendUpdateRequest() {
    type === "post"
      ? updatePost({ variables: { key, input: { id: postId, text } } })
      : updateComment({ variables: { key, input: { id: commentId, text } } })
  }

  function sendDeleteRequest() {
    type === "post"
      ? deletePost({ variables: { key, input: { id: postId } } })
      : deleteComment({ variables: { key, input: { id: commentId } } })
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
      <AiFillDelete css={[icon]} onClick={() => openModal("delete")} />

      {showModal && currentModal === "update" && (
        <Modal onClick={closeModal} title={`Update ${type}`}>
          <form
            onSubmit={e => {
              e.preventDefault()
              sendRequest([
                { key, errorFn: setKeyError },
                { text, errorFn: setTextError },
              ])(sendUpdateRequest)
            }}
          >
            <label htmlFor="updateKey">Key: </label>
            <input
              id="updateKey"
              type="text"
              value={key}
              onChange={keyBind.onChange}
            />
            {keyError ? <p>{keyError}</p> : null}
            <label htmlFor="update">
              {type === "post" ? "Post" : "Comment"}
            </label>
            <input
              type="text"
              id="update"
              value={text}
              onChange={textBind.onChange}
            />
            {textError ? <p>{textError}</p> : null}
            <button type="submit">Send</button>
          </form>
        </Modal>
      )}

      {showModal && currentModal === "delete" && (
        <Modal onClick={closeModal} title={`Delete ${type}`}>
          <form
            onSubmit={e => {
              e.preventDefault()
              sendRequest([{ key, errorFn: setKeyError }])(sendDeleteRequest)
            }}
          >
            <label htmlFor="deleteKey">Key: </label>
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
  postId: PropTypes.string,
  commentId: PropTypes.string,
  type: PropTypes.string.isRequired,
}

const icon = css`
  color: ${colors.rhythm};
  cursor: pointer;
`
const editIcon = css`
  margin-right: 0.5rem;
`
