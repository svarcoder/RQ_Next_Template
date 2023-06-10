export const generateQueryString = (options?: {
  [key: string | number | symbol]: any
}) => {
  if (!options) return ''
  let queryString = ''
  for (const key in options) {
    if (options[key] || options[key] === false) {
      queryString += `${key}=${options[key]}&`
    }
  }
  return queryString.slice(0, -1)
}
