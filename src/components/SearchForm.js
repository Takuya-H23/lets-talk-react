/**@jsx jsx */
import { useState } from "react"
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import colors from "./../assets/colors"

function SearchForm() {
  const [input, setInput] = useState("")
  const [inputError, setInputError] = useState(false)

  function handleSubmit(e) {
    console.log("here")
    e.preventDefault()
    const isValid = input.trim().length > 0

    if (!isValid) return setInputError(true)
    setInputError(false)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="search">
        <Input
          onChange={e => setInput(e.target.value)}
          id="search"
          type="text"
          placeholder="Search"
          value={input}
          error={inputError}
        />
      </label>
    </Form>
  )
}

const Form = styled.form`
  flex-grow: 1;
`
const Input = styled.input(props => ({
  backgroundColor: colors.white,
  border: props.error ? `3px solid ${colors.salmon}` : "3px solid transparent",
  width: "80%",
  borderRadius: "3px 3px",
  padding: "0.5rem",
}))

export default SearchForm
