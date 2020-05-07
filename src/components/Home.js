/**@jsx jsx */
import { jsx } from "@emotion/core"
import { useQuery } from "@apollo/react-hooks"
import { GET_POSTS } from "../graphql/query"
import styled from "@emotion/styled"
import Section from "./elements/Section"
import PostCard from "./elements/PostCard"

function Home() {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Ops</p>

  return (
    <Section>
      <Ul>
        {data.posts.map((post, index) => (
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
