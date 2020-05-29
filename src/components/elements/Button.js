/**@jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import colors from "../../assets/colors"

function Button({
  children,
  onClick,
  type = "button",
  center = false,
  className,
}) {
  return (
    <ButtonS
      type={type}
      onClick={onClick}
      center={center}
      className={className}
    >
      {children}
    </ButtonS>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

const ButtonS = styled.button(({ center }) => ({
  backgroundColor: colors.black,
  border: "1px solid transparent",
  borderRadius: "2px 2px",
  color: colors.white,
  padding: "0.5rem 1rem",
  display: center ? "block" : "inline",
  marginLeft: center ? "auto" : "0",
  marginRight: center ? "auto" : "0",
}))

export default Button
