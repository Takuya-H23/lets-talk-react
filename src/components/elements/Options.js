/**@jsx jsx */
import { css, jsx } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import colors from "../../assets/colors"

export default function Options({ id, type }) {
  return (
    <div>
      <AiFillEdit
        css={[icon, editIcon]}
        onClick={() => console.log(`${type}id => ${id} on edit`)}
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
