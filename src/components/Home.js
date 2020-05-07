/**@jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import Section from "./elements/Section"
import PostCard from "./elements/PostCard"

function Home({ posts }) {
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
