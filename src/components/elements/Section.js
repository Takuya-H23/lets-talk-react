/** @jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"

function Section({ children }) {
  return <SectionS>{children}</SectionS>
}

const SectionS = styled.section(props => ({
  padding: "2rem",
}))

Section.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Section
