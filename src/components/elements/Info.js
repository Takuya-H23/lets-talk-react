/**@jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import Options from "./Options"
import NameAndDate from "./NameAndDate"

export default function Info({ id, name, createdAt, updatedAt, type }) {
  return (
    <InfoWrapper>
      <NameAndDate name={name} createdAt={createdAt} updatedAt={updatedAt} />
      <Options id={id} type={type} />
    </InfoWrapper>
  )
}

Info.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
}

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
