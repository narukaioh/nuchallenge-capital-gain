export const stringToList = string => {
  return string.split('\n').filter(line => line !== '').map(line => JSON.parse(line))
}
