export const stringToList = string => {
  return string.split('\n').map(line => JSON.parse(line))
}
