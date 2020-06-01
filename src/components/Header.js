/** @jsx jsx */
import { jsx } from "@emotion/core"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import colors from "./../assets/colors"
import SearchForm from "./SearchForm"

function Header() {
  return (
    <HeaderS>
      <H1>
        <Link to="/">Let's Talk</Link>
      </H1>
      {/* <SearchForm /> */}
    </HeaderS>
  )
}

const HeaderS = styled.header`
  background-color: ${colors.black};
  color: ${colors.white};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1.5rem;
  position: fixed;
  top: 0;
  width: 100%;
`
const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-right: 3rem;
`

export default Header
