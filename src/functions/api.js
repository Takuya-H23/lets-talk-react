import { compose } from "ramda"

export const validateString = str => {
  return str.trim().length > 0
}

export const validatePayload = (...arg) => arg.every(validateString)

export const validateInputs = arr =>
  arr.filter(x => !validateString(x[Object.keys(x)[0]]))

const generateRequestCallback = inputs =>
  !inputs.length
    ? f => f()
    : () => inputs.map(x => x.errorFn(`${Object.keys(x)[0]} is not valid`))

export const sendRequest = compose(generateRequestCallback, validateInputs)

export default validatePayload
