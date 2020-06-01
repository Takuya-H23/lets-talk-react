/**@jsx jsx */
import PropTypes from "prop-types"
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import mediaQueries from "../../assets/mediaQueries"
import colors from "../../assets/colors"

function Textarea({ className, id, value, onChange }) {
  return (
    <TextareaS
      id={id}
      className={className}
      value={value}
      onChange={onChange}
    />
  )
}

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

const TextareaS = styled.textarea`
  padding: 1rem 0.5rem;
  border: 1px solid ${colors.rhythm};
  height: 6rem;
  ${mediaQueries["md"]} {
    height: 8vw;
  }
`

export default Textarea
