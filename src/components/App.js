/** @jsx jsx */
import { useContext, useEffect } from "react"
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import GlobalCss from "./GlobalCss"
import { Switch, Route } from "react-router-dom"
import Header from "./Header"
import Home from "./Home"
import { PostsContext } from "./../context/postsContext"

function App() {
  const { fetchPosts } = useContext(PostsContext)

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="App">
      <GlobalCss />
      <Header />
      <Switch>
        <Main>
          <Home exact path="/" />
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
