/** @jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"

function Section({ children, className }) {
  return <SectionS className={className}>{children}</SectionS>
}

const SectionS = styled.section(props => ({
  padding: "2rem",
}))

Section.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Section
