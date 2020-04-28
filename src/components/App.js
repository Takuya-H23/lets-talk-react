/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import styled from "@emotion/styled"
import GlobalCss from "./GlobalCss"

function App() {
  return (
    <div className="App">
      <GlobalCss />
      <Main>
        <div>here</div>
      </Main>
    </div>
  )
}

const Main = styled.main`
  width: 120rem;
  margin: 0 auto;
`
export default App
