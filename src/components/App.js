/** @jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import GlobalCss from "./GlobalCss"
import { useQuery } from "@apollo/react-hooks"
import { POSTS } from "../graphql/query"

function App() {
  const { loading, error, data } = useQuery(POSTS)

  if (loading) return <div>Loading...</div>

  console.log(data)
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
