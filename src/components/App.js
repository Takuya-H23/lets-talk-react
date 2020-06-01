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
import colors from "../assets/colors"

function App() {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <P>Waking up the GraphQL server from idling...</P>
  if (error)
    return (
      <P>
        Sorry...
        <br />
        Something went wrong
      </P>
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
const P = styled.p`
  margin-top: 2rem;
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 1.2;
  colors: ${colors.rhythm};
`
export default App
