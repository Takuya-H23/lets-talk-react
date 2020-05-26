export const validateString = str => str.trim().length > 0

export const validatePayload = (...arg) => arg.every(validateString)

export default validatePayload
