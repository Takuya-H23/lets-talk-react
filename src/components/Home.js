/**@jsx jsx */
import { useContext } from "react"
import { jsx } from "@emotion/core"
import { PostsContext, status as postStatus } from "./../context/postsContext"
import styled from "@emotion/styled"
import Section from "./elements/Section"
import PostCard from "./elements/PostCard"

function Home() {
  const { posts, status } = useContext(PostsContext)

  if (status === postStatus.IDLE) {
    return <div>Idling...</div>
  }

  if (status === postStatus.PENDING) {
    return <Section>Loading...</Section>
  }

  if (status === postStatus.REJECTED) {
    return <Section>Something went wrong</Section>
  }

  return (
    <Section>
      <Ul>
        {posts.map((post, index) => (
          <PostCard key={`post-${index}`} {...post} />
        ))}
      </Ul>
    </Section>
  )
}

const Ul = styled.ul`
  list-style: none;
  display: grid;
  row-gap: 2rem;
`

export default Home
