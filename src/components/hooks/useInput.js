import { useState } from "react"

export default function (initialState = "") {
  const [state, setState] = useState(initialState)

  function handleOnChange(e) {
    setState(e.target.value)
  }

  function reset() {
    setState(initialState)
  }

  const bind = {
    state,
    onChange: handleOnChange,
  }

  return [state, bind, setState, reset]
}
