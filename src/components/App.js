/** @jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import GlobalCss from "./GlobalCss"
import { Switch, Route } from "react-router-dom"
import Header from "./Header"
import Home from "./Home"
import PostDetail from "./PostDetail"
import { useQuery } from "@apollo/react-hooks"
import { GET_POSTS } from "../graphql/query"

function App() {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <p>Loading...</p>
  if (error)
    return (
      <p>
        Sorry...
        <br />
        Something went wrong
      </p>
    )
  return (
    <div className="App">
      <GlobalCss />
      <Header />
      <Switch>
        <Main>
          <Route exact path="/" render={() => <Home posts={data.posts} />} />
          <Route path="/post/:id" component={PostDetail} />
        </Main>
      </Switch>
    </div>
  )
}

const Main = styled.main`
  max-width: 120rem;
  margin: 6.4rem auto 0;
`
export default App
