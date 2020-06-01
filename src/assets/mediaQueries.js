const breakpoints = [576, 768, 992, 1200]
const label = ['sm', 'md', 'lg', 'xl']

const mqs = breakpoints
  .map((breakpoint, index) => ({
    [label[index]]: `@media(min-width: ${breakpoint}px)`,
  }))
  .reduce((acc, cur) => {
    return { ...acc, ...cur }
  }, {})

export default mqs
