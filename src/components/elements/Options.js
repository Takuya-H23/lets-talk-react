/**@jsx jsx */
import { css, jsx } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import { useMutation } from "@apollo/react-hooks"
import { useHistory } from "react-router-dom"
import { UPDATE_POST } from "../../graphql/mutation"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import colors from "../../assets/colors"

export default function Options({ id, type }) {
  const [updatePost] = useMutation(UPDATE_POST)

  return (
    <div>
      <AiFillEdit
        css={[icon, editIcon]}
        onClick={() =>
          updatePost({
            variables: { key: "yoyoyo", input: { id, text: "hello world" } },
          })
        }
      />
      <AiFillDelete
        css={[icon]}
        onClick={() => console.log(`${type}id => ${id} on delete`)}
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
