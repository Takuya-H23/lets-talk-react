/**@jsx jsx */
import { css, jsx } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import { useMutation } from "@apollo/react-hooks"
import { useHistory } from "react-router-dom"
import { UPDATE_POST, DELETE_POST } from "../../graphql/mutation"
import { GET_POSTS } from "../../graphql/query"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import colors from "../../assets/colors"

export default function Options({ id, type }) {
  const history = useHistory()
  const [updatePost] = useMutation(UPDATE_POST)
  const [deletePost, deletedPost] = useMutation(DELETE_POST, {
    update(cache, { data: { deletePost } }) {
      const { posts } = cache.readQuery({ query: GET_POSTS })
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: posts.filter(post => post.id !== deletePost.id) },
      })
    },
    onCompleted: () => {
      history.push("/")
    },
  })

  if (deletedPost.error) return <div>Ops</div>

  return (
    <div>
      <AiFillEdit
        css={[icon, editIcon]}
        onClick={() =>
          updatePost({
            variables: { key: "yoyoyo", input: { id, text: "hello world2" } },
          })
        }
      />
      <AiFillDelete
        css={[icon]}
        onClick={() =>
          deletePost({ variables: { key: "yoyoyo", input: { id } } })
        }
      />
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
