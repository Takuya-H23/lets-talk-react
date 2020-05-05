/**@jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import colors from "../../assets/colors"
import formatDate from "../../functions/formatDate"

export default function NameAndDate({ name, createdAt, updatedAt }) {
  return (
    <Span>
      by {name}{" "}
      {createdAt === updatedAt
        ? `created at ${formatDate(createdAt)}
        `
        : `updated at ${formatDate(updatedAt)}`}
    </Span>
  )
}

NameAndDate.propTypes = {
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
}

const Span = styled.span`
  color: ${colors.rhythm};
  font-size: 1.5rem;
`
