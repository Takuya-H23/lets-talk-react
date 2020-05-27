export const validateString = str => {
  return str.trim().length > 0
}

export const validatePayload = (...arg) => arg.every(validateString)

// [{key: 'key', fn: () => {}}]
// export const validateInputs = (...args) =>
//   args.reduce(
//     (acc, cur) =>
//       validateString(cur[Object.keys(cur)[0]]) ? acc : [...acc, cur],
//     []
//   // )

export const validateInputs = arr =>
  arr.filter(x => !validateString(x[Object.keys(x)[0]]))

export default validatePayload
