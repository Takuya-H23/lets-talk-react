/** @jsx jsx */
import { useContext, useEffect } from "react"
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import GlobalCss from "./GlobalCss"
import Header from "./Header"
import { PostsContext } from "./../context/postsContext"

function App() {
  const { fetchPosts, posts } = useContext(PostsContext)

  useEffect(() => {
    fetchPosts()
  }, [])

  console.log(posts)
  return (
    <div className="App">
      <GlobalCss />
      <Header />
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
